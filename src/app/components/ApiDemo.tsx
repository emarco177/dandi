'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ApiDemo() {
  const [payload, setPayload] = useState(JSON.stringify({ githubUrl: "https://github.com/assafelovic/gpt-researcher" }, null, 2))
  const [response, setResponse] = useState(JSON.stringify({
    summary: "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to produce detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
    cool_facts: [
      "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs by using each only when necessary.",
      "The average research task using GPT Researcher takes around 2 minutes to complete and costs approximately $0.005."
    ]
  }, null, 2))
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setResponse(JSON.stringify(JSON.parse(response), null, 2))
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle>API Request</CardTitle>
          <CardDescription>Edit the payload and send a request</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="min-h-[200px] font-mono"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Request'}
          </Button>
          <Button variant="outline" onClick={() => window.open('#', '_blank')}>
            Documentation
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>View the response from the API</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={response}
            readOnly
            className="min-h-[200px] font-mono"
          />
        </CardContent>
      </Card>
    </div>
  )
}