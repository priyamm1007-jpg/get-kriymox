import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { inspectWebsite } from "../../services/inspection";

import styles from "./Loading.module.css";

const steps = [
  "Initializing inspection...",
  "✓ URL validated",
  "✓ Connecting...",
  "✓ Downloading HTML...",
  "✓ Parsing DOM...",
  "✓ Extracting Metadata...",
  "✓ Detecting Framework...",
  "✓ Detecting Fonts...",
  "✓ Preparing Report..."
];

export default function Loading() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const url = state?.url;

  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {

    if (!url) {
      navigate("/");
      return;
    }

    let index = 0;

    const interval = setInterval(() => {

      setVisibleSteps((prev) => [...prev, steps[index]]);

      index++;

      if (index === steps.length) {
        clearInterval(interval);
      }

    }, 450);

    const startInspection = async () => {

      try {

        const report = await inspectWebsite(url);

        setTimeout(() => {

          navigate("/report", {
            state: report,
          });

        }, 4200);

      } catch (error) {

        console.error(error);

        navigate("/");

      }

    };

    startInspection();

    return () => clearInterval(interval);

  }, []);

  return (

    <main className={styles.loading}>

      <div className={styles.wrapper}>

        <h1>KRIYMOX</h1>

        <small>{url}</small>

        <div className={styles.logs}>

          {visibleSteps.map((step) => (

            <p key={step}>{step}</p>

          ))}

        </div>

      </div>

    </main>

  );

}