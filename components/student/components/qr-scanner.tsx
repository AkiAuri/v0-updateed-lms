"use client"

import { QrCode } from "lucide-react"

interface QRScannerProps {
  onScan: (data: any) => void
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const handleSimulatedScan = () => {
    const mockData = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      classId: "CS-201-001",
    }
    onScan(mockData)
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
        <QrCode size={64} className="text-slate-400 dark:text-slate-500" />
      </div>
      <button
        onClick={handleSimulatedScan}
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
      >
        Simulate QR Scan
      </button>
      <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
        In a production app, this would use your device camera to scan QR codes
      </p>
    </div>
  )
}
