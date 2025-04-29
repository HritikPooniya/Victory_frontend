export const validateRFPForm = (formData) => {
    const {
      itemname, description, quantity, min, max, date, vendors
    } = formData;
    const errors = {};
  
    if (!itemname) errors.itemname = "Item name is required.";
    if (!description) errors.description = "Description is required.";
    if (!quantity) errors.quantity = "Quantity is required.";
    if (!min) errors.min = "Minimum price is required.";
    if (!max) errors.max = "Maximum price is required.";
    if (!date) errors.date = "Date is required.";
    if (!vendors || vendors.length === 0) errors.vendors = "Select at least one vendor.";
  
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);
    const today = new Date();
    const inputDate = new Date(date);
  
    if (min && max && (minVal < 0 || minVal > maxVal)) {
      errors.min = "Min must be between 0 and max.";
    }
  
    if (min && max && maxVal < minVal) {
      errors.max = "Max cannot be less than min.";
    }
  
    if (date && inputDate < new Date(today.setHours(0, 0, 0, 0))) {
      errors.date = "Date cannot be in the past.";
    }
  
    return errors;
  };