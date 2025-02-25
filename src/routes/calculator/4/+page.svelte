<script>
    import { onMount } from 'svelte';
    
    let personName = '';
    let phoneNumber = '';
    let donationAmount = '';
    let isFormValid = false;
    let isGPayAvailable = false;
  
    // Validate form on input changes
    $: isFormValid = personName.trim() !== '' && 
                     /^[0-9]{10}$/.test(phoneNumber) && 
                     donationAmount > 0;
  
    // Check if Google Pay is available
    onMount(() => {
      if (window.navigator.userAgent.toLowerCase().includes('android')) {
        isGPayAvailable = true;
      }
    });
  
    // Handle form submission
    function handleSubmit() {
      if (!isFormValid) return;
      
      // Create UPI payment URL for Google Pay
      const upiUrl = `upi://pay?pa=yourUPIid@provider&pn=YourName&am=${donationAmount}&cu=INR&tn=Donation from ${encodeURIComponent(personName)}`;
      
      // Open Google Pay if on Android, otherwise provide fallback
      if (isGPayAvailable) {
        window.location.href = `https://pay.google.com/gp/v/send?upi=${encodeURIComponent(upiUrl)}`;
      } else {
        window.location.href = upiUrl; // This will open default UPI app on device
      }
    }
  </script>
  
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="personName" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input 
          type="text" 
          id="personName" 
          bind:value={personName} 
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your name"
          required
        />
      </div>
      
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input 
          type="tel" 
          id="phoneNumber" 
          bind:value={phoneNumber} 
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="10-digit mobile number"
          required
        />
        <p class="text-xs text-gray-500 mt-1">10-digit number without spaces or country code</p>
      </div>
      
      <div>
        <label for="donationAmount" class="block text-sm font-medium text-gray-700">Donation Amount (INR)</label>
        <input 
          type="number" 
          id="donationAmount" 
          bind:value={donationAmount} 
          min="1"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
          required
        />
      </div>
      
      <button 
        type="submit" 
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        disabled={!isFormValid}
      >
        {donationAmount ? `Pay ₹${donationAmount} INR` : 'Pay'}
      </button>
    </form>
    
    <div class="mt-6 flex items-center">
      <img src="/api/placeholder/40/40" alt="Google Pay logo" class="h-10" />
      <p class="ml-2 text-sm text-gray-600">Secured by Google Pay</p>
    </div>
  </div>