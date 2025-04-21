import emailjs from "@emailjs/browser";

export const sendFormData = async (formData: any) => {
  const serviceId = "service_mkwmttv"; // Replace with your EmailJS Service ID
  const templateId = "template_68rfpv2"; // Replace with your EmailJS Template ID
  const publicKey = "qlEGXYu12QdE5_9q-"; // Replace with your EmailJS Public Key


  const templateParams = {
    title: formData.title,
    full_name: formData.fullName,
    identity_number: formData.identityNumber,
    mobile_number: formData.mobileNumber,
    marital_status: formData.maritalStatus,
    number_of_children: formData.numberOfChildren,
    occupation: formData.occupation,
    email: formData.email,
    personal_assets: formData.personalAssets,
    number_of_dependants: formData.numberOfDependants,
    personal_obligations: formData.personalObligations,
    residential_address: formData.residentialAddress,
    business_name: formData.businessName,
    business_address: formData.businessAddress,
    type_of_business: formData.typeOfBusiness,
    tin_number: formData.tinNumber,
    years_in_business: formData.yearsInBusiness,
    number_of_employees: formData.numberOfEmployees,
    main_products: formData.mainProducts,
    sales_per_period: formData.salesPerPeriod,
    is_registered: formData.isRegistered,
    not_registered_reason: formData.notRegisteredReason,
    main_challenges: formData.mainChallenges,
    credit_facilities: formData.creditFacilities,
    business_assets: formData.businessAssets,
    kin_title: formData.kinTitle,
    kin_full_name: formData.kinFullName,
    kin_relationship: formData.kinRelationship,
    kin_mobile_number: formData.kinMobileNumber,
    kin_cell: formData.kinCell,
    kin_education: formData.kinEducation,
    kin_occupation: formData.kinOccupation,
    kin_residential_address: formData.kinResidentialAddress,
    guarantor_title: formData.guarantorTitle,
    guarantor_full_name: formData.guarantorFullName,
    guarantor_relationship: formData.guarantorRelationship,
    guarantor_mobile_number: formData.guarantorMobileNumber,
    guarantor_cell: formData.guarantorCell,
    guarantor_education: formData.guarantorEducation,
    guarantor_occupation: formData.guarantorOccupation,
    guarantor_residential_address: formData.guarantorResidentialAddress,
    guarantor_id_number: formData.guarantorIdNumber,
    bank_name: formData.bankName,
    bank_branch: formData.bankBranch,
    account_number: formData.accountNumber,
    loan_amount: formData.loanAmount,
    loan_amount_in_words: formData.loanAmountInWords,
    loan_purpose: formData.loanPurpose,
    loan_tenure: formData.loanTenure,
    desired_instalment: formData.desiredInstalment,
    security_ceded: formData.securityCeded,
    security_value: formData.securityValue,
    client_name: formData.clientName,
    client_signature_date: formData.clientSignatureDate,
    guarantor_signature_date: formData.guarantorSignatureDate,
    representative_name: formData.representativeName,
    representative_id_number: formData.representativeIdNumber,
    representative_signature_date: formData.representativeSignatureDate,
    manager_signature_date: formData.managerSignatureDate,
    agreed_to_terms: formData.agreedToTerms,
    execution_place: formData.executionPlace,
    execution_date: formData.executionDate,
    debtor_name: formData.debtorName,
    guarantor_name: formData.guarantorName,
    prepared_by_name: formData.preparedByName,
    prepared_by_date: formData.preparedByDate,
    approved_by_name: formData.approvedByName,
    approved_by_date: formData.approvedByDate,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, formData, publicKey);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};