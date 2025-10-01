import React, { useState } from "react";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you will receive a tracking number by email. You can use this number on our website to check real-time updates of your package.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery. Items must be unused and in original packaging. Refunds will be processed to your original payment method.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! Shipping costs and delivery times vary depending on the destination.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 2 hours after placing. Please contact our support team as soon as possible.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-10">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium text-gray-700 hover:text-yellow-600 focus:outline-none"
            >
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>

            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
