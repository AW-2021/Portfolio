import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

type FormValues = {
  name: string;
  email: string;
  project: string[];
  budget: string;
  details: string;
};

const projects = [
  "MultiPage Website Development",
  "Landing Page Development",
  "Mobile App Development",
  "Landing Page Design",
  "Fix an existing website",
];

const ContactForm = () => {
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.log("Missing EmailJS environment variables.");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await emailjs.send(
        serviceId, // EmailJS Service ID
        templateId, // EmailJS Template ID
        {
          from_name: data.name,
          from_email: data.email,
          project: (data.project ?? []).join(", "),
          budget: data.budget || "Not specified",
          details: data.details || "—",
        },
        publicKey // EmailJS Public Key
      );

      reset();
      alert("✅ Your message has been sent successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  const inputStyle = "w-full bg-light dark:bg-dark border-0 px-3 py-4 rounded-sm font-normal focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-400";

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-accent-light dark:bg-accent-dark p-6 md:p-9 rounded-sm w-full font-heading text-[16px] sm:text-[18px] tracking-tight font-medium flex flex-col gap-y-6"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Name */}
      <fieldset className="flex flex-col gap-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="ex. John Smith"
          {...register("name", { required: "Name is required." })}
          className={inputStyle}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </fieldset>

      {/* Email */}
      <fieldset className="flex flex-col gap-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="hello@website.com"
          {...register("email", { required: "Email is required" })}
          className={inputStyle}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </fieldset>

      {/* Project Checkboxes */}
      <fieldset className="flex flex-col gap-y-5">
        <label className="block">What’s Your Project About?</label>
        <div className="flex flex-col gap-y-4">
          {projects.map((proj) => (
            <label key={proj} className="checkbox-field flex items-center gap-2">{proj}
              <input type="checkbox" value={proj} {...register("project")} />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Budget */}
      <fieldset className="flex flex-col gap-y-2">
        <label htmlFor="budget" className="block">
          Your Budget
        </label>
        <input
          id="budget"
          type="text"
          placeholder="ex. $100 - $500"
          {...register("budget")}
          className={inputStyle}
        />
      </fieldset>

      {/* Details */}
      <fieldset className="flex flex-col gap-y-2">
        <label htmlFor="details" className="block">Share More Details</label>
        <textarea
          id="details"
          rows={3}
          placeholder="Describe additional requirements..."
          {...register("details")}
          className={`min-h-[140px] resize-y ` + inputStyle}
        />
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        className="cursor-pointer w-[120px] h-[50px] bg-text-light dark:bg-text-dark text-light dark:text-dark px-6 text-base hover:bg-neutral-700 dark:hover:bg-neutral-400 transition duration-500 rounded-xs"
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </button>

      {isSubmitSuccessful && (
        <p className="text-emerald-600 italic text-sm font-semibold">
          Thanks! I’ll get back to you soon.
        </p>
      )}
    </motion.form>
  );
};

export default ContactForm;
