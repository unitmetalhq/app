"use client"
import { useState } from 'react'
import { IndexSupply } from 'idxs'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { format } from 'sql-formatter'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const is = IndexSupply.create()

function jsonReplacer(_key: string, value: unknown) {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}

export default function QueryPage() {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const { resolvedTheme } = useTheme()

  const { data, error, isFetching } = useQuery({
    queryKey: ['sql-query', submittedQuery],
    queryFn: () => is.fetch({ query: submittedQuery }),
    enabled: !!submittedQuery.trim(),
  })

  const result = error
    ? JSON.stringify({ error: String(error) }, jsonReplacer, 2)
    : data
      ? JSON.stringify(data, jsonReplacer, 2)
      : ''

  return (
    <div className="flex flex-col gap-6 px-6 py-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Query</h1>
        <p className="text-sm text-muted-foreground">Use SQL to fetch onchain data. Powered by <a href="https://indexsupply.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline underline-offset-2">IndexSupply</a>.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">Editor</label>
            <Button
              variant="outline"
              className="rounded-none hover:cursor-pointer"
              onClick={() => setQuery(format(query, { language: 'sql' }))}
              disabled={!query.trim()}
            >
              Format
            </Button>
          </div>
          <CodeMirror
            value={query}
            onChange={setQuery}
            extensions={[sql()]}
            theme={resolvedTheme === 'dark' ? githubDark : githubLight}
            placeholder="Enter your SQL query here..."
            height="400px"
            className="overflow-auto rounded-none"
          />
        </div>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => setSubmittedQuery(query)}
            className="rounded-none hover:cursor-pointer"
            disabled={isFetching || !query.trim()}
          >
            {isFetching ? 'Executing...' : 'Execute Query'}
          </Button>
          <Button
            variant="outline"
            className="rounded-none hover:cursor-pointer"
            onClick={() => setQuery('')}
          >
            Clear
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Result</label>
          <Textarea
            value={result}
            readOnly
            placeholder="Query results will appear here..."
            className="h-[400px] resize-none overflow-auto font-mono bg-muted/50 rounded-none"
          />
        </div>
      </div>
    </div>
  )
}