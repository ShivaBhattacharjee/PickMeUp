'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardIcon, CheckIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export default function PickupLineGenerator() {
  const [personality, setPersonality] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'neutral'>('female')
  const [pickupLine, setPickupLine] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)


  const generatePickupLine = async () => {
    setIsGenerating(true)
    try {
      const req = await axios.post('/api/generate-pickuplines', { personality: personality, gender: gender })
      const res = await req.data
      setPickupLine(res.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in POST handler:", error);
        toast({
          title: 'An error occurred',
          description: error.message,
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pickupLine)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-purple-900 bg-opacity-50 text-white">
      <CardHeader>
        <CardTitle>Generate Your Pickup Line</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="personality">Describe Their Personality</Label>
          <Textarea
            id="personality"
            placeholder="e.g., funny, intelligent, adventurous"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="bg-purple-800 bg-opacity-50 border-purple-600  placeholder-purple-300"
          />
        </div>
        <div className="space-y-2 z-50">
          <Label htmlFor="gender">Select Gender</Label>
          <Select value={gender} autoComplete='true' onValueChange={(value) => setGender(value as 'male' | 'female' | 'neutral')}>
            <SelectTrigger id="gender" className="bg-purple-800 focus:outline-none focus:border-none bg-opacity-50 border-purple-600 text-white">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 text-white">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={generatePickupLine}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isGenerating ? (
            'Hang on... 🧐 let me cook!!!'
          ) : (
            'Generate Pickup Line'
          )}
        </Button>
      </CardContent>
      <CardFooter>
        <AnimatePresence mode="wait">
          {pickupLine && (
            <motion.div
              key={pickupLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-purple-800 bg-opacity-50 p-4 rounded-lg mb-4 relative">
                <p className="text-lg max-w-[90%]">{pickupLine}</p>
                <Button
                  size="icon"
                  variant="link"
                  className="absolute text-white hover:bg-purple-600 duration-150  top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  )
}

