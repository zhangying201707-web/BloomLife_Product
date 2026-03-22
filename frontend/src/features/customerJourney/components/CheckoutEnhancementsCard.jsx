import { useEffect, useState } from 'react';
import { applyPromoCode, getPaymentMethods } from '../api';

export default function CheckoutEnhancementsCard({ subtotal, onMessage }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoResult, setPromoResult] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [loadingPromo, setLoadingPromo] = useState(false);

  useEffect(() => {
    async function loadMethods() {
      try {
        const data = await getPaymentMethods();
        setPaymentMethods(data.data || []);
        if (data.data?.[0]) {
          setSelectedPayment(data.data[0].id);
        }
      } catch (error) {
        onMessage?.(error.message);
      }
    }

    loadMethods();
  }, [onMessage]);

  async function handleApplyPromo() {
    setLoadingPromo(true);
    try {
      const data = await applyPromoCode({ code: promoCode, subtotal });
      setPromoResult(data.data);
      onMessage?.(`Promo applied: ${data.data.code}`);
    } catch (error) {
      onMessage?.(error.message);
    } finally {
      setLoadingPromo(false);
    }
  }

  const selectedMethod = paymentMethods.find((item) => item.id === selectedPayment);

  return (
    <article className="journey-card">
      <h3>Promo & Payment</h3>
      <input
        className="text-input"
        placeholder="Promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button className="primary-btn" onClick={handleApplyPromo} disabled={loadingPromo}>
        {loadingPromo ? 'Applying...' : 'Apply Promo'}
      </button>
      {promoResult && (
        <p className="hint-text">
          {promoResult.code}: -¥{Number(promoResult.discount).toFixed(2)}. New total ¥
          {Number(promoResult.totalAfterDiscount).toFixed(2)}
        </p>
      )}
      <select className="text-input" value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
        {paymentMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.name}
          </option>
        ))}
      </select>
      {selectedMethod && (
        <p className="hint-text">
          Payment: {selectedMethod.name} ({selectedMethod.eta})
        </p>
      )}
    </article>
  );
}
