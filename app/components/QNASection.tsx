"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const QNASection = () => {
  const [show, setshow] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      question: "What is AI text editor?",
      answer:
        "AI text editor is a tool that uses artificial intelligence to help you edit text.",
    },
    {
      id: 2,
      question: "Is it safe to use AI text editor?",
      answer:
        "Yes, your data is safe with us. we do not share data with anyone",
    },
    {
      id: 3,
      question: "How do I get started?",
      answer: "To get started, simply sign up and start editing.",
    },
    {
      id: 4,
      question: "AI text editor is open source",
      answer: "Yes, it is open source and available on GitHub.",
    },
  ];

  const handleshow = (index: number) => {
    setshow(show === index ? null : index);
  };

  return (
    <>
      <section className="py-16">
        <section className="mx-auto w-full max-w-2xl md:max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
          <h2 className="text-3xl max-w-md mt-4">Questions & Answers</h2>
          <section>
            <hr />
            {questions.map((q) => (
              <div key={q.id}>
                <section className="flex justify-between items-center py-4">
                  <h3 className="text-md">{q.question}</h3>
                  {show !== q.id && (
                    <CaretDownIcon size={16} onClick={() => handleshow(q.id)} />
                  )}
                  {show === q.id && (
                    <CaretUpIcon size={16} onClick={() => handleshow(q.id)} />
                  )}
                </section>
                <AnimatePresence initial={false}>
                  {show === q.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, type: "tween" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-muted-foreground">{q.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <hr />
              </div>
            ))}
            <hr />
          </section>
        </section>
      </section>
    </>
  );
};

export default QNASection;
