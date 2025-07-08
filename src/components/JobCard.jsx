import React from "react";
import { motion } from "framer-motion";
import { MapPin, Tag, Home, Users, DollarSign, Clock } from "lucide-react";

const JobCard = ({ job, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer border border-gray-100 hover:border-blue-200 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {job.posisi_magang}
          </h3>
          <p className="text-lg font-semibold text-gray-700 mb-1">
            {job.mitra}
          </p>
        </div>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          {job.jumlah} posisi
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {job.kategori_posisi && (
          <div className="flex items-center gap-2 text-gray-600">
            <Tag size={16} className="text-blue-500" />
            <span className="text-sm">{job.kategori_posisi}</span>
          </div>
        )}
        {job.provinsi && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-green-500" />
            <span className="text-sm">{job.provinsi}</span>
          </div>
        )}
        {job.tempat_tinggal && (
          <div className="flex items-center gap-2 text-gray-600">
            <Home size={16} className="text-purple-500" />
            <span className="text-sm">{job.tempat_tinggal}</span>
          </div>
        )}
        {job.gaji && job.gaji.trim() && (
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={16} className="text-yellow-500" />
            <span className="text-sm">{job.gaji}</span>
          </div>
        )}
        {job.durasi && job.durasi.trim() && !job.gaji && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} className="text-purple-500" />
            <span className="text-sm">{job.durasi}</span>
          </div>
        )}
      </div>

      <p
        className="text-gray-600 text-sm leading-relaxed mb-4"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {job.deskripsi.length > 120
          ? `${job.deskripsi.substring(0, 120)}...`
          : job.deskripsi}
      </p>

      {job.lokasi_penempatan && (
        <div className="flex items-start gap-2 text-gray-500 text-xs">
          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
          <span
            className="truncate"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {job.lokasi_penempatan.length > 80
              ? `${job.lokasi_penempatan.substring(0, 80)}...`
              : job.lokasi_penempatan}
          </span>
        </div>
      )}

      {/* Hover effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"
      />
    </motion.div>
  );
};

export default JobCard;
