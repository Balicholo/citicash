import emailjs from "@emailjs/browser";

export const sendFormData = async (formData: any) => {
  const serviceId = "service_enf43yw"; // Replace with your EmailJS Service ID
  const templateId = "your_template_id"; // Replace with your EmailJS Template ID
  const publicKey = "your_public_key"; // Replace with your EmailJS Public Key

  try {
    const response = await emailjs.send(serviceId, templateId, formData, publicKey);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};