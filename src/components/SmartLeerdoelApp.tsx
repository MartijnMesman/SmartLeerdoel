'use client'

import { useState } from 'react'

interface LeerdoelData {
  specifiek: string
  meetbaar: string
  acceptabel: string
  realistisch: string
  tijdgebonden: string
}

interface StapData {
  titel: string
  beschrijving: string
  vraag: string
  placeholder: string
  tip: string
  voorbeelden: string[]
}

const SMART_STAPPEN: StapData[] = [
  {
    titel: "S - Specifiek",
    beschrijving: "Wat wil je precies leren of bereiken?",
    vraag: "Beschrijf zo concreet mogelijk wat je wilt leren:",
    placeholder: "Bijvoorbeeld: Ik wil leren hoe ik een professionele presentatie geef...",
    tip: "Vermijd vage termen zoals 'beter worden'. Wees heel concreet over wat je wilt leren.",
    voorbeelden: [
      "Ik wil leren hoe ik effectief feedback geef aan teamleden",
      "Ik wil de basis van Python programmeren onder de knie krijgen",
      "Ik wil leren hoe ik een goede thesis-opzet schrijf"
    ]
  },
  {
    titel: "M - Meetbaar", 
    beschrijving: "Hoe ga je meten of je je doel hebt behaald?",
    vraag: "Hoe kun je concreet meten dat je dit hebt geleerd?",
    placeholder: "Bijvoorbeeld: Door een presentatie te geven aan 10 collega's...",
    tip: "Denk aan concrete resultaten, cijfers, of observeerbare gedragingen.",
    voorbeelden: [
      "Door een feedbackgesprek te voeren en positieve reacties te krijgen",
      "Door 3 werkende Python programma's te schrijven",
      "Door een thesis-opzet van 5 pagina's te schrijven die wordt goedgekeurd"
    ]
  },
  {
    titel: "A - Acceptabel/Aantrekkelijk",
    beschrijving: "Waarom is dit leerdoel belangrijk voor jou?",
    vraag: "Waarom wil je dit leren? Wat is je motivatie?",
    placeholder: "Bijvoorbeeld: Dit helpt mij om beter te communiceren in mijn stage...",
    tip: "Verbind je leerdoel aan je persoonlijke of professionele ontwikkeling.",
    voorbeelden: [
      "Dit helpt me om een betere teamleider te worden in mijn toekomstige baan",
      "Python skills zijn essentieel voor mijn gewenste carrière in data science",
      "Een goede thesis is cruciaal voor mijn afstuderen en vervolgstudies"
    ]
  },
  {
    titel: "R - Realistisch",
    beschrijving: "Is dit leerdoel haalbaar met jouw huidige situatie?",
    vraag: "Waarom is dit leerdoel realistisch voor jou om te behalen?",
    placeholder: "Bijvoorbeeld: Ik heb toegang tot collega's om mee te oefenen...",
    tip: "Denk aan je beschikbare tijd, middelen, en huidige kennis.",
    voorbeelden: [
      "Ik heb wekelijks teamvergaderingen waar ik dit kan oefenen",
      "Ik heb al basiskennis van programmeren en 2 uur per dag beschikbaar",
      "Ik heb een begeleider die mij kan helpen en feedback kan geven"
    ]
  },
  {
    titel: "T - Tijdgebonden",
    beschrijving: "Wanneer wil je dit leerdoel hebben behaald?",
    vraag: "Wat is je concrete deadline voor dit leerdoel?",
    placeholder: "Bijvoorbeeld: Voor het einde van mijn stage in maart 2024...",
    tip: "Kies een realistische maar uitdagende deadline. Niet te ver weg, niet te dichtbij.",
    voorbeelden: [
      "Voor het einde van dit semester (juni 2024)",
      "Binnen 8 weken, voor mijn volgende project begint",
      "Voor mijn thesis-deadline in december 2024"
    ]
  }
]

export default function SmartLeerdoelApp() {
  const [huidigeStap, setHuidigeStap] = useState(0)
  const [leerdoelData, setLeerdoelData] = useState<LeerdoelData>({
    specifiek: '',
    meetbaar: '',
    acceptabel: '',
    realistisch: '',
    tijdgebonden: ''
  })
  const [isVoltooid, setIsVoltooid] = useState(false)
  const [toonVoorbeelden, setToonVoorbeelden] = useState(false)

  const huidigeStapData = SMART_STAPPEN[huidigeStap]
  const stapKeys: (keyof LeerdoelData)[] = ['specifiek', 'meetbaar', 'acceptabel', 'realistisch', 'tijdgebonden']

  const handleInputChange = (value: string) => {
    const key = stapKeys[huidigeStap]
    setLeerdoelData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const volgendeStap = () => {
    if (huidigeStap < SMART_STAPPEN.length - 1) {
      setHuidigeStap(huidigeStap + 1)
      setToonVoorbeelden(false)
    } else {
      setIsVoltooid(true)
    }
  }

  const vorigeStap = () => {
    if (huidigeStap > 0) {
      setHuidigeStap(huidigeStap - 1)
      setToonVoorbeelden(false)
    }
  }

  const opnieuwBeginnen = () => {
    setHuidigeStap(0)
    setLeerdoelData({
      specifiek: '',
      meetbaar: '',
      acceptabel: '',
      realistisch: '',
      tijdgebonden: ''
    })
    setIsVoltooid(false)
    setToonVoorbeelden(false)
  }

  const genereerSMARTLeerdoel = () => {
    const { specifiek, meetbaar, acceptabel, realistisch, tijdgebonden } = leerdoelData
    return `${specifiek} Ik ga dit meten door ${meetbaar.toLowerCase()}. Dit is belangrijk voor mij omdat ${acceptabel.toLowerCase()}. Dit is realistisch omdat ${realistisch.toLowerCase()}. Ik wil dit bereiken ${tijdgebonden.toLowerCase()}.`
  }

  const kopieerNaarKlembord = async () => {
    try {
      await navigator.clipboard.writeText(genereerSMARTLeerdoel())
      alert('SMART-leerdoel gekopieerd naar klembord!')
    } catch (error) {
      console.error('Kopiëren mislukt:', error)
    }
  }

  if (isVoltooid) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Gefeliciteerd!
          </h1>
          <p className="text-xl text-gray-600">
            Je hebt succesvol een SMART-leerdoel opgesteld
          </p>
        </div>

        {/* Resultaat */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              ✅
            </span>
            Jouw SMART-leerdoel
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-gray-800 text-lg leading-relaxed">
              {genereerSMARTLeerdoel()}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={kopieerNaarKlembord}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>📋</span>
              <span>Kopieer naar klembord</span>
            </button>
            
            <button
              onClick={opnieuwBeginnen}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Nieuw leerdoel maken</span>
            </button>
          </div>
        </div>

        {/* SMART overzicht */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            📊 Jouw SMART-componenten
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SMART_STAPPEN.map((stap, index) => {
              const key = stapKeys[index]
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{stap.titel}</h4>
                  <p className="text-gray-600 text-sm">{leerdoelData[key]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎯 SMART Leerdoel Opstellen
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Leer stap voor stap een effectief leerdoel formuleren
        </p>
        
        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((huidigeStap + 1) / SMART_STAPPEN.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-500">
          Stap {huidigeStap + 1} van {SMART_STAPPEN.length}
        </p>
      </div>

      {/* Huidige stap */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
            {huidigeStap + 1}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{huidigeStapData.titel}</h2>
            <p className="text-gray-600">{huidigeStapData.beschrijving}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">
            {huidigeStapData.vraag}
          </label>
          <textarea
            value={leerdoelData[stapKeys[huidigeStap]]}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={huidigeStapData.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Tip */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">💡</span>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Tip:</h4>
              <p className="text-yellow-700 text-sm">{huidigeStapData.tip}</p>
            </div>
          </div>
        </div>

        {/* Voorbeelden toggle */}
        <div className="mb-6">
          <button
            onClick={() => setToonVoorbeelden(!toonVoorbeelden)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
          >
            <span>{toonVoorbeelden ? '👁️' : '👀'}</span>
            <span>{toonVoorbeelden ? 'Verberg voorbeelden' : 'Toon voorbeelden'}</span>
          </button>
          
          {toonVoorbeelden && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">Voorbeelden:</h4>
              <ul className="space-y-2">
                {huidigeStapData.voorbeelden.map((voorbeeld, index) => (
                  <li key={index} className="text-blue-700 text-sm flex items-start">
                    <span className="mr-2">•</span>
                    <span>{voorbeeld}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigatie */}
        <div className="flex justify-between">
          <button
            onClick={vorigeStap}
            disabled={huidigeStap === 0}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>←</span>
            <span>Vorige</span>
          </button>
          
          <button
            onClick={volgendeStap}
            disabled={!leerdoelData[stapKeys[huidigeStap]].trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{huidigeStap === SMART_STAPPEN.length - 1 ? 'Voltooien' : 'Volgende'}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* SMART uitleg */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          📚 Wat betekent SMART?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMART_STAPPEN.map((stap, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-2 transition-all ${
                index === huidigeStap 
                  ? 'border-blue-500 bg-blue-50' 
                  : index < huidigeStap 
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 ${
                  index === huidigeStap 
                    ? 'bg-blue-500' 
                    : index < huidigeStap 
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                }`}>
                  {index < huidigeStap ? '✓' : index + 1}
                </span>
                <h4 className="font-semibold text-gray-800">{stap.titel}</h4>
              </div>
              <p className="text-gray-600 text-sm">{stap.beschrijving}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}