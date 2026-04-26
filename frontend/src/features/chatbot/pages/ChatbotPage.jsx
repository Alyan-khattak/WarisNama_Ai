// import React from 'react'
// import { useChatbot } from '../hooks/useChatbot'
// import ChatWindow from '../components/ChatWindow'

// const ChatbotPage = () => {
//   const { messages, loading, send } = useChatbot()

//   return (
//     <div className="h-full flex flex-col">
//       <h1 className="text-2xl font-bold mb-4">AI Legal Assistant</h1>
//       <div className="flex-1 min-h-0">
//         <ChatWindow messages={messages} loading={loading} onSendMessage={send} />
//       </div>
//     </div>
//   )
// }

// export default ChatbotPage







// import React, { useState, useRef, useEffect } from 'react'
// import toast from 'react-hot-toast'
// import { useChatbot } from '../hooks/useChatbot'
// import ChatWindow from '../components/ChatWindow'
// import VoiceButton from '../../../components/common/VoiceButton'

// const ChatbotPage = () => {
//   const { messages, loading, send, clear } = useChatbot()
//   const [voiceLanguage, setVoiceLanguage] = useState('ur-PK') // 'ur-PK' or 'en-US'

//   const handleVoiceTranscript = (transcript) => {
//     if (transcript && transcript.trim()) {
//       // Optionally auto‑send the recognized text
//       send(transcript)
//     } else {
//       toast.error('Could not recognize speech. Please try again.')
//     }
//   }

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">AI Legal Assistant – WarisNama Chatbot</h1>
//         <div className="flex items-center gap-2">
//           <label className="text-sm">Voice language:</label>
//           <select
//             value={voiceLanguage}
//             onChange={(e) => setVoiceLanguage(e.target.value)}
//             className="border rounded p-1 text-sm"
//           >
//             <option value="ur-PK">Urdu (Pakistan)</option>
//             <option value="en-US">English (US)</option>
//           </select>
//           <VoiceButton onTranscript={handleVoiceTranscript} language={voiceLanguage} />
//           <button onClick={clear} className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300">
//             Clear Chat
//           </button>
//         </div>
//       </div>
//       <div className="flex-1 min-h-0">
//         <ChatWindow messages={messages} loading={loading} onSendMessage={send} />
//       </div>
//     </div>
//   )
// }

// export default ChatbotPage









// Aroosa


import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useChatbot } from '../hooks/useChatbot'
import ChatWindow from '../components/ChatWindow'
import VoiceButton from '../../../components/common/VoiceButton'

const ChatbotPage = () => {
  const { messages, loading, send, clear } = useChatbot()
  const [voiceLanguage, setVoiceLanguage] = useState('ur-PK') // 'ur-PK' or 'en-US'

  const handleVoiceTranscript = (transcript) => {
    if (transcript && transcript.trim()) {
      // Optionally auto‑send the recognized text
      send(transcript)
    } else {
      toast.error('Could not recognize speech. Please try again.')
    }
  }

  return (
    // MAIN CONTAINER WITH BACKGROUND IMAGE ADDED
    <div 
      className="min-h-screen p-4"
      style={{
        backgroundImage: `url('/assets/images/hero-bg.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content wrapper with semi-transparent background for readability */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <h1 className="text-4xl font-bold" style={{ color: '#0c6e30' }}>
              AI Legal Assistant – WarisNama Chatbot
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-sm font-medium text-gray-700">Voice language:</label>
              <select
                value={voiceLanguage}
                onChange={(e) => setVoiceLanguage(e.target.value)}
                className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="ur-PK">Urdu (Pakistan)</option>
                <option value="en-US">English (US)</option>
              </select>
              <VoiceButton onTranscript={handleVoiceTranscript} language={voiceLanguage} />
              <button 
                onClick={clear} 
                className="bg-gray-200 hover:bg-green-300 px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:green-400"
              >
                Clear Chat
              </button>
            </div>
          </div>
          
          {/* Chat Window with semi-transparent background */}
          <div className="flex-1 min-h-0 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
            <ChatWindow messages={messages} loading={loading} onSendMessage={send} />
          </div>
          
          {/* Footer */}
          <div className="text-center mt-6 py-2">
            <p className="text-xs">
              <span className="text-green-600 font-semibold">Powered by WarisNama AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage