
export const loadPayPalSdk = (clientId, components = 'buttons,fastlane') => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-sdk')) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=${components}`;
      script.defer = true;
  
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
  
      document.body.appendChild(script);
    });
  };
  