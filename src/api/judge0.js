const BASE_URL = "https://ce.judge0.com";

const languageMap = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

export async function runCode(code, language, input) {
  const languageId = languageMap[language];

  if (!languageId) {
    throw new Error("Unsupported language");
  }

  // Step 1: Submit code
  const submitResponse = await fetch(
    `${BASE_URL}/submissions?base64_encoded=false&wait=false`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input,
      }),
    }
  );

  const submitData = await submitResponse.json();

  return submitData.token;
}

export async function getResult(token) {
  while (true) {
    const response = await fetch(
      `${BASE_URL}/submissions/${token}?base64_encoded=false`
    );

    const data = await response.json();

    if (data.status.id <= 2) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    return data;
  }
}