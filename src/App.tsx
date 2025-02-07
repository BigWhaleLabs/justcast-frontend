import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import React from 'react'

export default function App() {
  const examples = {
    node: `const axios = require('axios');

axios.post('https://publish.justcast.me/', {
  data: { text: "Hello, world!", embeds: [], mentions: [], mentionsPositions: [] },
  fid: 123,
  signerPrivateKey: '0x...' 
}).then(response => console.log(response.data))
  .catch(error => console.error(error));`,

    curl: `curl -X POST https://publish.justcast.me/ \\
  -H "Content-Type: application/json" \\
  -d '{"data": {"text": "Hello, world!", "embeds": [], "mentions": [], "mentionsPositions": []}, "fid": 123, "signerPrivateKey": "0x..."}'`,

    python: `import requests

response = requests.post("https://publish.justcast.me/", json={
    "data": {"text": "Hello, world!", "embeds": [], "mentions": [], "mentionsPositions": []},
    "fid": 123,
    "signerPrivateKey": "0x..."
})
print(response.json())`,

    rust: `use reqwest::blocking::Client;
use serde_json::json;

fn main() {
    let client = Client::new();
    let res = client.post("https://publish.justcast.me/")
        .json(&json!({
            "data": {
                "text": "Hello, world!",
                "embeds": [],
                "mentions": [],
                "mentionsPositions": []
            },
            "fid": 123,
            "signerPrivateKey": "0x..."
        }))
        .send();

    match res {
        Ok(response) => println!("Response: {:?}", response),
        Err(e) => eprintln!("Error: {}", e),
    }
}`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://publish.justcast.me/"
    data := map[string]interface{}{
        "data": map[string]interface{}{
            "text": "Hello, world!",
            "embeds": []interface{}{},
            "mentions": []interface{}{},
            "mentionsPositions": []interface{}{},
        },
        "fid": 123,
        "signerPrivateKey": "0x...",
    }
    
    jsonData, err := json.Marshal(data)
    if err != nil {
        fmt.Println("Error marshaling JSON:", err)
        return
    }

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error making POST request:", err)
        return
    }
    defer resp.Body.Close()
    
    fmt.Println("Response status:", resp.Status)
}`,
  }

  // Style for wrapping long lines properly.
  const lineStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word' }

  return (
    <div className="container mx-auto max-w-2xl bg-gray-900 p-10 text-gray-100">
      <h1 className="text-3xl font-bold">Publish Cast API</h1>
      <p className="mt-4 text-gray-300">
        An API to publish casts using Farcaster's hub-nodejs.
      </p>

      <h2 className="mt-6 text-xl font-semibold">How to Use</h2>
      <p className="mt-2">
        Send a POST request to{' '}
        <code className="rounded bg-gray-700 px-2 py-1">
          https://publish.justcast.me/
        </code>{' '}
        with the following JSON body:
      </p>

      {/* JSON Example using SyntaxHighlighter */}
      <SyntaxHighlighter
        language="json"
        style={oneDark}
        wrapLongLines
        lineProps={{ style: lineStyle }}
        customStyle={{ marginTop: '1rem', borderRadius: '0.5rem' }}
      >
        {`{
  "data": {
    "text": "Your cast text", // The content of your cast
    "embeds": [], // URLs or cast IDs to embed
    "mentions": [], // Mentioned FIDs
    "mentionsPositions": [] // Positions of mentions in the text
  },
  "fid": 123, // Your Farcaster ID (always required)
  "signerPrivateKey": "0x..." // Reuse this after first request, or provide "mnemonic": "..."
}`}
      </SyntaxHighlighter>

      <p className="mt-4 text-gray-300">
        For the first time, send the mnemonic of the account where you want to
        cast from. After the first request, you should use the returned{' '}
        <code className="rounded bg-gray-700 px-2 py-1">signerPrivateKey</code>,
        or create a new one by sending the mnemonic again.
      </p>
      <p className="mt-2 text-gray-300">
        If you provide a mnemonic instead of a signer private key, the address
        associated with the mnemonic must have enough OP Ether (around $1 worth)
        to create a signer.
      </p>
      <p className="mt-2 text-gray-300">
        We store nothing, including mnemonics and signer private keys.
      </p>
      <p className="mt-2 text-gray-300">
        For details on the{' '}
        <code className="rounded bg-gray-700 px-2 py-1">data</code> field, refer
        to the official Farcaster documentation:{' '}
        <a
          href="https://docs.farcaster.xyz/reference/hubble/datatypes/messages#_3-1-castaddbody"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          CastAddBody reference
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">Examples</h2>
      <div role="tablist" className="tabs tabs-bordered mt-4">
        {/* Node.js Example */}
        <input
          type="radio"
          name="example-tabs"
          role="tab"
          className="tab text-gray-300"
          aria-label="Node.js"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-4">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLongLines
            lineProps={{ style: lineStyle }}
          >
            {examples.node}
          </SyntaxHighlighter>
        </div>

        {/* cURL Example */}
        <input
          type="radio"
          name="example-tabs"
          role="tab"
          className="tab text-gray-300"
          aria-label="cURL"
        />
        <div role="tabpanel" className="tab-content p-4">
          <SyntaxHighlighter
            language="bash"
            style={oneDark}
            wrapLongLines
            lineProps={{ style: lineStyle }}
          >
            {examples.curl}
          </SyntaxHighlighter>
        </div>

        {/* Python Example */}
        <input
          type="radio"
          name="example-tabs"
          role="tab"
          className="tab text-gray-300"
          aria-label="Python"
        />
        <div role="tabpanel" className="tab-content p-4">
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            wrapLongLines
            lineProps={{ style: lineStyle }}
          >
            {examples.python}
          </SyntaxHighlighter>
        </div>

        {/* Rust Example */}
        <input
          type="radio"
          name="example-tabs"
          role="tab"
          className="tab text-gray-300"
          aria-label="Rust"
        />
        <div role="tabpanel" className="tab-content p-4">
          <SyntaxHighlighter
            language="rust"
            style={oneDark}
            wrapLongLines
            lineProps={{ style: lineStyle }}
          >
            {examples.rust}
          </SyntaxHighlighter>
        </div>

        {/* Go Example */}
        <input
          type="radio"
          name="example-tabs"
          role="tab"
          className="tab text-gray-300"
          aria-label="Go"
        />
        <div role="tabpanel" className="tab-content p-4">
          <SyntaxHighlighter
            language="go"
            style={oneDark}
            wrapLongLines
            lineProps={{ style: lineStyle }}
          >
            {examples.go}
          </SyntaxHighlighter>
        </div>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-400">
        Built with ❤️ using Tailwind & DaisyUI • Built by{' '}
        <a
          href="https://warpcast.com/borodutch"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          borodutch
        </a>
        <br />
        Open-source:{' '}
        <a
          href="https://github.com/bigwhalelabs/justcast-frontend"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend
        </a>{' '}
        |{' '}
        <a
          href="https://github.com/bigwhalelabs/justcast-backend"
          className="text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Backend
        </a>
      </footer>
    </div>
  )
}
