"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Heart, Gift, Cake, Star, Sparkles, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Fredoka as Fredoka_One, Nunito } from "next/font/google"

const fredokaOne = Fredoka_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export default function BirthdayWishPage() {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loadedElements, setLoadedElements] = useState<Set<string>>(new Set())
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Array foto dengan deskripsi - ganti dengan foto dan deskripsi asli
  const photos = [
    {
      src: "/1.jpeg?height=400&width=400",
      description: "Langit sore favorit sasa 🌞",
    },
    {
      src: "/2.jpeg?height=400&width=400",
      description: "Haloooo ini gelooo👋",
    },
    {
      src: "/3.jpeg?height=400&width=400",
      description: "Ini siapa ya? 🤔",
    },
    {
      src: "/4.jpeg?height=400&width=400",
      description: "With sasa bestfriends 🥰",
    },
    {
      src: "/5.jpeg?height=400&width=400",
      description: "And ini sasa mode Ganteng 😎 (kumis aduhai)",
    },
  ]

  // Auto-play musik saat website dibuka
  useEffect(() => {
    const tryAutoPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log("Autoplay failed, user interaction required:", error)
          // Jika autoplay gagal, musik akan bisa diputar saat user berinteraksi
        }
      }
    }

    // Delay sedikit untuk memastikan audio sudah loaded
    setTimeout(tryAutoPlay, 1000)
  }, [])

  // Trigger loading animations dengan delay
  useEffect(() => {
    const elements = ["hero", "gallery", "message", "button"]

    elements.forEach((element, index) => {
      setTimeout(() => {
        setLoadedElements((prev) => new Set([...prev, element]))
      }, index * 300)
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [photos.length])

  const triggerConfetti = () => {
    console.log("Confetti triggered!") // Debug log
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    // Jika musik belum diputar, coba putar saat user klik confetti
    if (!isPlaying && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Audio play failed:", error)
        })
    }
  }

  const handlePlayMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log("Audio play failed:", error)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden ${nunito.className}`}
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* Ganti dengan URL lagu ulang tahun yang sebenarnya */}
        <source src="/wasound.mpga" type="audio/mpeg" />
        <source src="/wasound.mpga" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <Button
          onClick={handlePlayMusic}
          size="sm"
          className="bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          variant="outline"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          onClick={toggleMute}
          size="sm"
          className="bg-white/90 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          variant="outline"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Music Visualizer */}
      {isPlaying && (
        <div className="fixed top-4 left-4 z-40">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 16 + 8}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">♪ Now Playing</span>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 text-pink-300 w-6 h-6 animate-pulse" />
        <Star className="absolute top-32 right-16 text-yellow-300 w-5 h-5 animate-spin" />
        <Sparkles className="absolute bottom-40 left-8 text-purple-300 w-7 h-7 animate-bounce" />
        <Gift className="absolute bottom-60 right-12 text-blue-300 w-6 h-6 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            loadedElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <Cake className="w-16 h-16 mx-auto text-pink-500 animate-bounce" />
          </div>
          <h1
            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4 ${fredokaOne.className}`}
          >
            Happy Birthday Ma Broo, Sasa!
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold text-gray-700 mb-6 ${fredokaOne.className}`}>
            - Selamat Ulang Tahun yang ke-18 ya broo! 🎉 -
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Semoga hari spesialmu dipenuhi dengan kebahagiaan, cinta, dan semua hal indah yang kamu impikan! 🎉
          </p>
        </div>

        {/* Photo Gallery */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            loadedElements.has("gallery") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative h-96 md:h-[28rem]">
                <Image
                  src={photos[currentPhoto]?.src || "/placeholder.svg"}
                  alt={`Memory ${currentPhoto + 1}`}
                  fill
                  className="object-cover transition-all duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Description Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg transform transition-all duration-500 hover:scale-105">
                    <p className="text-gray-800 font-medium text-center leading-relaxed">
                      {photos[currentPhoto]?.description}
                    </p>
                  </div>
                </div>

                {/* Photo Navigation Dots */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhoto(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentPhoto ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 bg-white/70 px-3 py-1 rounded-full">
              {currentPhoto + 1} dari {photos.length} kenangan indah
            </span>
          </div>
        </div>

        {/* Personal Message Section */}
        <div
          className={`mb-12 transition-all duration-1000 delay-600 ${
            loadedElements.has("message") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 text-center">
              <h3
                className={`text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2 ${fredokaOne.className}`}
              >
                <Heart className="text-red-500 w-6 h-6 animate-pulse" />
                Pesan Khusus Untukmu
                <Heart className="text-red-500 w-6 h-6 animate-pulse" />
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg transform transition-all duration-500 hover:scale-105">
                  Sasa, di hari istimewa ini, aku ingin mengingatkan betapa berartinya kamu bagi dunia. Kamu adalah
                  teman yang selalu ada, dan aku sangat berharap kamu selalu bahagia.
                </p>
                <p className="text-lg transform transition-all duration-500 hover:scale-105">
                  Kamu adalah orang yang luar biasa, dan aku berharap tahun ini membawa lebih banyak kebahagiaan,
                  kesuksesan, dan impian yang terwujud untukmu.
                </p>
                <p className="text-xl font-semibold text-purple-600 transform transition-all duration-500 hover:scale-105">
                  Semoga panjang umur, sehat selalu, dan bahagia selamanya! 🎂✨
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Button */}
        <div
          className={`text-center transition-all duration-1000 delay-900 ${
            loadedElements.has("button") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
          }`}
        >
          <Button
            onClick={(e) => {
              e.preventDefault()
              triggerConfetti()
            }}
            size="lg"
            className={`bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none ${fredokaOne.className}`}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Klik dulu biar kita ui ai kan dunia 🎉
          </Button>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-12 text-gray-500 transition-all duration-1000 delay-1200 ${
            loadedElements.has("button") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-sm">Dibuat oleh seorang yang baik nan rupawan ganteng idaman.</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-scale {
          animation: fadeInScale 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
