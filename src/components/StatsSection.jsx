import React from "react";
import { motion } from "framer-motion";
import { Building, Tag } from "lucide-react";

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      {/* Top Companies */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building className="text-blue-600" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Top 5 Perusahaan</h3>
        </div>

        <div className="space-y-3">
          {stats.topCompanies.map(([company, count], index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-700 truncate flex-1 mr-3">
                {company}
              </span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {count}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Tag className="text-green-600" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Top 5 Kategori</h3>
        </div>

        <div className="space-y-3">
          {stats.topCategories.map(([category, count], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-700 truncate flex-1 mr-3">
                {category}
              </span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {count}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsSection;
