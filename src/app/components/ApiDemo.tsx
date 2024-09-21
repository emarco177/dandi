'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function ApiDemo() {
  const [payload, setPayload] = useState(JSON.stringify({ githubUrl: "https://github.com/assafelovic/gpt-researcher" }, null, 2))
  const [response, setResponse] = useState(JSON.stringify({
    "summary": "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to provide detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
    "cool_facts": [
      "The project leverages both `gpt-4o-mini` and `gpt-4o` (128K context) to complete research tasks, optimizing costs and achieving an average completion time of around 2 minutes at a cost of ~$0.005.",
      "GPT Researcher offers the ability to generate long and detailed research reports (over 2K words) by aggregating over 20 web sources per research task to ensure objective and factual conclusions."
    ],
    "stars": 14076,
    "latestVersion": "v3.0.8",
    "websiteUrl": "https://gptr.dev",
    "licenseType": "Apache-2.0"
  }, null, 2))
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (session) {
      router.push('/playground');
    } else {
      router.push('/api/auth/signin');
    }
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
            {isLoading ? 'Sending...' : 'Try it out'}
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