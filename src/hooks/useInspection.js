import { useState } from "react";
import { inspectWebsite } from "../services/inspection";

export default function useInspection() {

  const [status, setStatus] = useState("idle");

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState(null);

  const [error, setError] = useState(null);

  const startInspection = async (url) => {

    try {

      setLoading(true);

      setStatus("connecting");

      setError(null);

      const data = await inspectWebsite(url);

      setReport(data);

      setStatus("complete");

    } catch (err) {

      setError(err.message);

      setStatus("error");

    } finally {

      setLoading(false);

    }

  };

  return {

    status,

    loading,

    report,

    error,

    startInspection,

  };

}