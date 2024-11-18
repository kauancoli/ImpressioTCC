import { motion } from "framer-motion";

type UserProps = object;

export const User: React.FC<UserProps> = () => {
  const pageAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="pt-6 px-4 sm:px-8"
      initial="hidden"
      animate="visible"
      variants={pageAnimation}
    >
      Frog
    </motion.div>
  );
};
