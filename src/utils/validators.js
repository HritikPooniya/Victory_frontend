const validators = {
    validateEmail: (email) => {
      if (!email) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
      return "";
    },
  
    validatePhone: (phone) => {
      if (!phone) return "Phone number is required";
      if (phone.length !== 10) return "Phone number must be 10 digits";
      return "";
    },
  
    validateRequired: (value, fieldName) => {
      return value ? "" : `${fieldName} is required`;
    },
  
    validatePasswordMatch: (password, confirmPassword) => {
      if (!confirmPassword) return "Confirm password is required";
      if (password !== confirmPassword) return "Passwords do not match";
      return "";
    },

     validateGST : (gst) => {
        if (!gst) return "GST number is required";
      
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        if (!gstRegex.test(gst)) return "Invalid GST number format";
      
        return "";
      },

      validatePAN : (pan) => {
        if (!pan) return "PAN number is required";
      
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan)) return "Invalid PAN number format";
      
        return "";
      }
  };


  export default validators;