"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

export default function BarreCompetence({ nom, niveau, contexte, ressenti }) {
  const ref = useRef(null);
  const estVisible = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="barre-competence-bloc" ref={ref}>
      <div className="barre-competence-entete">
        <span className="barre-competence-nom">{nom}</span>
        <span className="barre-competence-niveau">{niveau}%</span>
      </div>

      <div className="barre-competence-contexte">{contexte}</div>

      <div className="barre-competence-piste">
        <motion.div
          className="barre-competence-remplissage"
          initial={{ width: "0%" }}
          animate={estVisible ? { width: `${niveau}%` } : { width: "0%" }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />

        <motion.span
            className="barre-competence-goutte"
            initial={{ left: "0%", opacity: 1, scale: 1 }}
            animate={estVisible
                ? { left: `${niveau}%`, opacity: 0, scale: 0 }
                : { left: "0%", opacity: 1, scale: 1 }
            }
            transition={{
                left: { duration: 1.4, ease: "easeOut", delay: 0.2 },
                opacity: { duration: 0.3, delay: 1.5 },
                scale: { duration: 0.3, delay: 1.5 },
            }}
            style={{ translateY: "-50%", translateX: "-50%" }}
            >
            💧
            </motion.span>

            <motion.span
            className="barre-competence-fleur"
            initial={{ opacity: 0, scale: 0, left: `${niveau}%` }}
            animate={estVisible
                ? { opacity: 1, scale: 1, left: `${niveau}%` }
                : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.4, delay: 1.6 }}
            style={{ translateY: "-50%", translateX: "-50%" }}
            >
            🌸
        </motion.span>
      </div>

      <div className="barre-competence-ressenti">{ressenti}</div>
    </div>
  );
}

BarreCompetence.propTypes = {
  nom: PropTypes.string,
  niveau: PropTypes.number,
  contexte: PropTypes.string,
  ressenti: PropTypes.string,
};
