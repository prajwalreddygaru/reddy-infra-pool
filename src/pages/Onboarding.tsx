import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronRight, MapPin, Truck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { cities, userTypes } from '@/lib/mockData';

type OnboardingStep = 'phone' | 'userType' | 'city';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useAppStore();
  const [step, setStep] = useState<OnboardingStep>('phone');
  const [phone, setPhone] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep('userType');
    }
  };

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
    setTimeout(() => setStep('city'), 300);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleComplete = () => {
    setUser({
      isOnboarded: true,
      phone,
      userType: selectedUserType,
      city: selectedCity,
    });
    navigate('/');
  };


  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">reddyinfra.in</h1>
            <p className="text-sm text-muted-foreground">Smart Procurement Platform</p>
          </div>
        </motion.div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          {['phone', 'userType', 'city'].map((s, i) => (
            <motion.div
              key={s}
              className="h-1 flex-1 rounded-full bg-secondary overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width:
                    ['phone', 'userType', 'city'].indexOf(step) >= i
                      ? '100%'
                      : '0%',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'phone' && (
            <motion.div
              key="phone"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Enter your phone number
              </h2>
              <p className="text-muted-foreground mb-8">
                We'll send you a verification code
              </p>

              <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="input-field pl-24 text-lg tracking-wide"
                />
              </div>

              <button
                onClick={handlePhoneSubmit}
                disabled={phone.length !== 10}
                className="btn-primary w-full"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'userType' && (
            <motion.div
              key="userType"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                What describes you best?
              </h2>
              <p className="text-muted-foreground mb-6">
                This helps us personalize your experience
              </p>

              <div className="space-y-3">
                {userTypes.map((type, index) => (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleUserTypeSelect(type.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedUserType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{type.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                      {selectedUserType === type.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'city' && (
            <motion.div
              key="city"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Select your city
              </h2>
              <p className="text-muted-foreground mb-6">
                We'll show you relevant deals and logistics options
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {cities.map((city, index) => (
                  <motion.button
                    key={city}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleCitySelect(city)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedCity === city
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{city}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={handleComplete}
                disabled={!selectedCity}
                className="btn-primary w-full"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <button className="text-primary">Terms of Service</button> and{' '}
          <button className="text-primary">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}
