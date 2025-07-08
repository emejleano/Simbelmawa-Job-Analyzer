import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Building,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Tag,
  Home,
  Briefcase,
  RotateCcw,
} from "lucide-react";
import JobModal from "./components/JobModal";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilterSection from "./components/FilterSection";
import JobCard from "./components/JobCard";
import Pagination from "./components/Pagination";
import StatsSection from "./components/StatsSection";
import PredictionPage from "./components/PredictionPage";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailLoading, setIsJobDetailLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    province: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fungsi untuk fetch data detail lowongan dari JSON lokal
  const fetchJobDetail = async (job) => {
    try {
      setIsJobDetailLoading(true);

      if (job.slug || job.id) {
        const jobSlug = job.slug || `lowongan-${job.id}`;
        console.log("Fetching job detail for:", jobSlug);

        try {
          // Fetch dari JSON lokal yang berisi detail lengkap
          const response = await fetch(
            `${import.meta.env.BASE_URL}lowongan_details_20250708_123043.json`
          );

          if (!response.ok) {
            throw new Error(`Failed to load job details: ${response.status}`);
          }

          const allJobDetails = await response.json();

          // Cari job detail berdasarkan slug atau id
          const jobDetail = allJobDetails.find(
            (detail) =>
              detail.slug === jobSlug ||
              detail.id_lowongan === job.id ||
              detail.slug === `lowongan-${job.id}`
          );

          if (jobDetail) {
            console.log(
              "Successfully found job detail in local JSON:",
              jobDetail
            );
            setSelectedJob(jobDetail);
            return;
          } else {
            throw new Error(`Job detail not found for slug: ${jobSlug}`);
          }
        } catch (error) {
          console.error("Failed to load job details:", error.message);
          throw error;
        }
      } else {
        throw new Error("No slug or ID available for job");
      }
    } catch (error) {
      console.error("Error fetching job detail:", error);

      // Show error message to user
      alert(
        `Gagal memuat detail lowongan: ${error.message}\n\nPastikan file lowongan_details_20250708_123043.json tersedia.`
      );

      // Don't set selectedJob - this will keep the modal closed
      setSelectedJob(null);
    } finally {
      setIsJobDetailLoading(false);
    }
  };

  // Load data dari file JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}lowongan_all_20250625_090649.json`
        );
        const jsonData = await response.json();

        // Add missing properties to each job for better UI
        const enhancedData = jsonData.map((job, index) => ({
          ...job,
          id: index + 1,
          // Generate slug untuk matching dengan detail data
          slug: job.slug || `lowongan-${index + 1}`,
          // Don't generate random gaji - only use if exists and not empty
          gaji: job.gaji && job.gaji.trim() !== "" ? job.gaji : null,
          // Don't generate random durasi - only use if exists and not empty
          durasi: job.durasi && job.durasi.trim() !== "" ? job.durasi : null,
          // Ensure provinsi is clean
          provinsi:
            job.provinsi && job.provinsi.trim() !== ""
              ? job.provinsi
              : "Tidak Diketahui",
          // Only use real requirements and benefits data, no fake data
          requirements:
            job.requirements &&
            Array.isArray(job.requirements) &&
            job.requirements.length > 0
              ? job.requirements
              : null,
          benefits:
            job.benefits &&
            Array.isArray(job.benefits) &&
            job.benefits.length > 0
              ? job.benefits
              : null,
        }));

        setData(enhancedData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback to demo data if JSON fails
        setData([
          {
            id: 1,
            slug: "lowongan-1",
            posisi_magang: "Frontend Developer Intern",
            mitra: "PT Tech Indonesia",
            kategori_posisi: "Teknologi Informasi",
            provinsi: "DKI Jakarta",
            tempat_tinggal: "Disediakan",
            jumlah: 5,
            deskripsi:
              "Mencari mahasiswa yang tertarik dengan pengembangan frontend menggunakan React, Vue, atau Angular. Akan diberikan pelatihan intensif dan mentoring dari senior developer.",
            lokasi_penempatan: "Jakarta Selatan, DKI Jakarta",
            gaji: "Rp 2.500.000",
            durasi: "6 bulan",
            requirements: [
              "Mahasiswa aktif",
              "Menguasai HTML/CSS/JavaScript",
              "Familiar dengan React/Vue",
            ],
            benefits: ["Sertifikat", "Networking", "Mentoring"],
          },
        ]);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = data;

    if (filters.search) {
      filtered = filtered.filter(
        (item) =>
          item.posisi_magang
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          item.mitra.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.deskripsi.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (item) => item.kategori_posisi === filters.category
      );
    }

    if (filters.province) {
      filtered = filtered.filter(
        (item) => item.provinsi && item.provinsi === filters.province
      );
    }

    return filtered;
  }, [data, filters]);

  // Get unique values for filters
  const categories = useMemo(() => {
    return [...new Set(data.map((item) => item.kategori_posisi))]
      .filter(Boolean)
      .filter((cat) => cat && cat.trim() !== "")
      .sort();
  }, [data]);

  const provinces = useMemo(() => {
    return [...new Set(data.map((item) => item.provinsi))]
      .filter(Boolean)
      .filter((prov) => prov && prov.trim() !== "")
      .sort();
  }, [data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const topCompanies = {};
    const topCategories = {};

    data.forEach((item) => {
      topCompanies[item.mitra] = (topCompanies[item.mitra] || 0) + 1;
      topCategories[item.kategori_posisi] =
        (topCategories[item.kategori_posisi] || 0) + 1;
    });

    return {
      topCompanies: Object.entries(topCompanies)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
      topCategories: Object.entries(topCategories)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
    };
  }, [data]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleJobClick = (job) => {
    // Selalu panggil fetchJobDetail dengan object job lengkap
    fetchJobDetail(job);
  };

  const resetFilters = () => {
    setFilters({ search: "", category: "", province: "" });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <HeroSection
        totalJobs={data.length}
        totalCompanies={new Set(data.map((item) => item.mitra)).size}
        totalProvinces={provinces.length}
      />

      <div className="container mx-auto px-4 py-8">
        <FilterSection
          filters={filters}
          categories={categories}
          provinces={provinces}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {filteredData.length > 0 ? (
              <>
                Menampilkan {filteredData.length.toLocaleString()} lowongan
                {(filters.search || filters.category || filters.province) && (
                  <span className="text-gray-500 text-lg ml-2">
                    dari {data.length.toLocaleString()} total
                  </span>
                )}
              </>
            ) : (
              "Tidak ada hasil ditemukan"
            )}
          </h2>

          {(filters.search || filters.category || filters.province) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Reset Filter
            </motion.button>
          )}
        </motion.div>

        {/* Job Listings */}
        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada data yang ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah filter pencarian atau hapus filter yang aktif
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AnimatePresence>
                {currentPageData.map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={index}
                    onClick={() => handleJobClick(job)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        <StatsSection stats={stats} />
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="container mx-auto px-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>🎓 FOR EDUCATIONAL PURPOSE ONLY</strong> - Website ini
                dibuat untuk pembelajaran teknologi web modern. Tidak
                berafiliasi dengan sistem resmi SIMBELMAWA. Data ditampilkan
                hanya untuk demonstrasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Modal */}
      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        isLoading={isJobDetailLoading}
        onClose={() => setSelectedJob(null)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">
            Educational Version - SIMBELMAWA-like Dashboard
          </p>
          <p className="text-gray-400 mb-2">
            Generated on{" "}
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            | Total Records: {data.length.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            🎓 Dibuat untuk tujuan pembelajaran React.js dan modern web
            development
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prediksi" element={<PredictionPage />} />
      </Routes>
    </div>
  );
}

export default App;
