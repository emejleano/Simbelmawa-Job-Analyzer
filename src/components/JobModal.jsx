import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Tag,
  Home,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Award,
  Building,
  Calendar,
  BookOpen,
  Target,
  Info,
  MapPinIcon,
  Hash,
  ClipboardList,
  GraduationCap,
  Settings,
  Heart,
  Star,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

const JobModal = ({ job, isOpen, onClose, isLoading = false }) => {
  if (!job) return null;

  // Helper function to safely get values from both old and new format
  const getValue = (oldPath, newPath, fallback = "Tidak tersedia") => {
    if (newPath && job[newPath]) {
      return typeof job[newPath] === "object"
        ? job[newPath].nama || job[newPath].name
        : job[newPath];
    }
    return job[oldPath] || fallback;
  };

  // Helper function to check if data exists and is not empty/placeholder
  const hasValidData = (data) => {
    if (!data) return false;
    if (typeof data === "string") {
      const cleanData = data.trim().toLowerCase();
      // Check for common placeholder texts
      const placeholders = [
        "tidak tersedia",
        "akan diinformasikan",
        "akan dijelaskan",
        "akan dibahas",
        "akan disampaikan",
        "saat pendaftaran",
        "saat orientasi",
        "pada tahap seleksi",
        "dalam proses seleksi",
        "sesuai kebutuhan",
        "rincian tugas dan tanggung jawab akan dijelaskan lebih detail",
        "persyaratan pendidikan akan diinformasikan saat pendaftaran",
        "keterampilan teknis yang dibutuhkan akan dijelaskan detail",
        "kemampuan interpersonal dan karakter yang diharapkan",
        "persyaratan tambahan dan khusus akan disampaikan",
        "target pembelajaran dan kompetensi yang akan dicapai",
      ];
      return (
        cleanData.length > 0 &&
        !placeholders.some((placeholder) => cleanData.includes(placeholder))
      );
    }
    if (Array.isArray(data)) {
      return data.length > 0 && data.some((item) => hasValidData(item));
    }
    return true;
  };

  // Extract values with fallbacks for both formats
  const posisiMagang =
    getValue("posisi_magang", "posisi_magang") ||
    getValue(null, "posisi_magang.nama");
  const mitraName = getValue("mitra", "mitra") || getValue(null, "mitra.nama");
  const kategoriPosisi =
    getValue("kategori_posisi", "kategori_posisi") ||
    getValue(null, "kategori_posisi.nama");
  const provinsiName =
    getValue("provinsi", "provinsi") ||
    getValue(null, "lowongan_lokasi.provinsi.name");

  // Extract company details
  const mitraInfo =
    job.mitra && typeof job.mitra === "object" ? job.mitra : null;

  // Extract criteria/requirements with validation
  const rawRequirements =
    job.requirements ||
    (job.lowongan_kriteria
      ? job.lowongan_kriteria.map((k) => k.deskripsi)
      : []);
  const requirements = rawRequirements.filter((req) => hasValidData(req));

  // Extract responsibilities with validation
  const rawResponsibilities = job.lowongan_tanggung_jawab
    ? job.lowongan_tanggung_jawab.map((t) => t.deskripsi).join("\n")
    : job.deskripsi;
  const responsibilities = hasValidData(rawResponsibilities)
    ? rawResponsibilities
    : null;

  // Extract achievements/benefits with validation
  const rawAchievements =
    job.lowongan_capaian && job.lowongan_capaian.length > 0
      ? job.lowongan_capaian.map((c) => c.deskripsi).join("\n")
      : job.benefits
      ? job.benefits.join("\n")
      : null;
  const achievements = hasValidData(rawAchievements) ? rawAchievements : null;

  // Check benefits data
  const validBenefits = job.benefits
    ? job.benefits.filter((benefit) => hasValidData(benefit))
    : [];

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 p-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                />
                <p className="text-gray-600 text-lg">Memuat data lowongan...</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 relative">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X size={20} />
                  </motion.button>

                  <div className="pr-12">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold mb-2"
                    >
                      {posisiMagang}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl opacity-90 flex items-center gap-2"
                    >
                      <Building size={20} />
                      {mitraName}
                    </motion.p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {/* Quick Info Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                  >
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <Users className="text-blue-600 mx-auto mb-2" size={24} />
                      <p className="text-sm text-gray-600">Posisi Tersedia</p>
                      <p className="text-xl font-bold text-gray-800">
                        {job.jumlah}
                      </p>
                    </div>

                    {job.gaji && job.gaji.trim() && (
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <DollarSign
                          className="text-green-600 mx-auto mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-600">Gaji</p>
                        <p className="text-lg font-bold text-gray-800">
                          {job.gaji}
                        </p>
                      </div>
                    )}

                    {job.durasi && job.durasi.trim() && (
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <Clock
                          className="text-purple-600 mx-auto mb-2"
                          size={24}
                        />
                        <p className="text-sm text-gray-600">Durasi</p>
                        <p className="text-lg font-bold text-gray-800">
                          {job.durasi}
                        </p>
                      </div>
                    )}

                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <Home
                        className="text-yellow-600 mx-auto mb-2"
                        size={24}
                      />
                      <p className="text-sm text-gray-600">Tempat Tinggal</p>
                      <p className="text-lg font-bold text-gray-800">
                        {job.tempat_tinggal}
                      </p>
                    </div>
                  </motion.div>

                  {/* Job Information Section - SIMBELMAWA Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Info size={20} />
                          Informasi Dasar
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Kategori Posisi
                            </label>
                            <p className="text-gray-800 font-medium">
                              {kategoriPosisi}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Jumlah Posisi
                            </label>
                            <p className="text-gray-800 font-medium">
                              {job.jumlah} orang
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Penyedia Tempat Tinggal
                            </label>
                            <p className="text-gray-800 font-medium">
                              {job.tempat_tinggal}
                            </p>
                          </div>
                          {job.created_at && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">
                                Tanggal Posting
                              </label>
                              <p className="text-gray-800 font-medium">
                                {new Date(job.created_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          )}
                          {job.id_lowongan && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">
                                ID Lowongan
                              </label>
                              <p className="text-gray-800 font-medium">
                                #{job.id_lowongan}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <MapPinIcon size={20} />
                          Lokasi Penempatan
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        {job.lokasi_penempatan ? (
                          <div className="bg-green-50 rounded-lg p-4">
                            <label className="text-sm font-medium text-gray-600 block mb-2">
                              Detail Lokasi Penempatan
                            </label>
                            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                              {job.lokasi_penempatan}
                            </p>
                          </div>
                        ) : job.lowongan_lokasi ? (
                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {job.lowongan_lokasi.provinsi && (
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Provinsi
                                  </label>
                                  <p className="text-gray-800 font-medium">
                                    {job.lowongan_lokasi.provinsi.name}
                                  </p>
                                </div>
                              )}
                              {job.lowongan_lokasi.kota && (
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Kota/Kabupaten
                                  </label>
                                  <p className="text-gray-800 font-medium">
                                    {job.lowongan_lokasi.kota.name}
                                  </p>
                                </div>
                              )}
                              {job.lowongan_lokasi.kecamatan && (
                                <div>
                                  <label className="text-sm font-medium text-gray-600">
                                    Kecamatan
                                  </label>
                                  <p className="text-gray-800 font-medium">
                                    {job.lowongan_lokasi.kecamatan.name}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-gray-600 italic">
                              Informasi lokasi akan tersedia setelah koneksi ke
                              server
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Job Description - only show if valid data exists */}
                    {responsibilities && (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen size={20} />
                            Deskripsi Posisi
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="bg-purple-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {responsibilities}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mitra Information */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Building size={20} />
                          Informasi Mitra
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="bg-orange-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-600">
                                Nama Mitra
                              </label>
                              <p className="text-gray-800 font-semibold text-lg">
                                {mitraName}
                              </p>
                            </div>
                            {mitraInfo?.jenis && (
                              <div>
                                <label className="text-sm font-medium text-gray-600">
                                  Jenis Mitra
                                </label>
                                <p className="text-gray-800 font-medium">
                                  {mitraInfo.jenis}
                                </p>
                              </div>
                            )}
                            {mitraInfo?.alamat && (
                              <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-600">
                                  Alamat
                                </label>
                                <p className="text-gray-800 font-medium whitespace-pre-line">
                                  {mitraInfo.alamat}
                                </p>
                              </div>
                            )}
                            {job.mitra_slug && (
                              <div>
                                <label className="text-sm font-medium text-gray-600">
                                  Kode Mitra
                                </label>
                                <p className="text-gray-800 font-medium">
                                  {job.mitra_slug}
                                </p>
                              </div>
                            )}
                          </div>
                          {mitraInfo?.deskripsi && (
                            <div className="mt-4 pt-4 border-t border-orange-200">
                              <label className="text-sm font-medium text-gray-600">
                                Tentang Mitra
                              </label>
                              <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                                {mitraInfo.deskripsi}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Requirements & Benefits - only show if valid data exists */}
                    {(requirements && requirements.length > 0) ||
                    (validBenefits && validBenefits.length > 0) ||
                    achievements ? (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Target size={20} />
                            Persyaratan & Benefit
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {requirements && requirements.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <CheckCircle
                                    className="text-blue-600"
                                    size={18}
                                  />
                                  Persyaratan
                                </h4>
                                <div className="space-y-2">
                                  {requirements.map((req, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: 0.7 + index * 0.1,
                                      }}
                                      className="flex items-center gap-3 bg-blue-50 rounded-lg p-3"
                                    >
                                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                      <span className="text-gray-700 whitespace-pre-line">
                                        {req}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {validBenefits && validBenefits.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Award className="text-green-600" size={18} />
                                  Benefit
                                </h4>
                                <div className="space-y-2">
                                  {validBenefits.map((benefit, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.7 + index * 0.1 }}
                                      className="flex items-center gap-3 bg-green-50 rounded-lg p-3"
                                    >
                                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                                      <span className="text-gray-700 whitespace-pre-line">
                                        {benefit}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {achievements && (
                              <div className="md:col-span-2">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Target
                                    className="text-purple-600"
                                    size={18}
                                  />
                                  Target Capaian
                                </h4>
                                <div className="bg-purple-50 rounded-lg p-4">
                                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {achievements}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
