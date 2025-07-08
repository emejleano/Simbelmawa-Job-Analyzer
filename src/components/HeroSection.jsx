import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Building, MapPin, Target, Sparkles } from "lucide-react";

const HeroSection = ({ totalJobs, totalCompanies, totalProvinces }) => {
  const stats = [
    {
      icon: Briefcase,
      value: totalJobs.toLocaleString(),
      label: "Total Lowongan",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Building,
      value: totalCompanies.toLocaleString(),
      label: "Mitra Perusahaan",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      value: totalProvinces.toLocaleString(),
      label: "Provinsi",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">Data Lowongan Magang</h1>
          <p className="text-xl opacity-90 mb-6">
            Sistem Informasi Monitoring Belajar dan Magang (SIMBELMAWA)
          </p>

          {/* Prediction CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Link
              to="/prediksi"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Target className="h-6 w-6" />
              <span className="text-lg">🎯 PREDIKSI LOWONGAN COCOK</span>
              <Sparkles className="h-5 w-5" />
            </Link>
            <p className="text-sm opacity-80 mt-2">
              Analisis profil Anda dan dapatkan rekomendasi lowongan terbaik!
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center">
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center mr-4`}
                >
                  <stat.icon className={stat.color} size={28} />
                </div>
                <div>
                  <motion.h3
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className="text-3xl font-bold text-gray-800"
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
