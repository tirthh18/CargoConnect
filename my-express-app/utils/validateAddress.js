// const validateAddress = async (address) => {
//   const apiKey = process.env.OPENCAGE_API_KEY;
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

//   const response = await axios.get(url);
//   const data = response.data;

//   if (data && data.results && data.results.length > 0) {
//     const result = data.results[0];
//     const { confidence, components, geometry } = result;

//     if (
//       confidence >= 7 &&
//       components.road &&  // ensures address has street
//       components.city &&  // ensures it’s within a known city
//       components.postcode // ensures pincode is found
//     ) {
//       return { valid: true, location: geometry };
//     }
//   }

//   return { valid: false, reason: 'Address not accurate enough' };
// };
