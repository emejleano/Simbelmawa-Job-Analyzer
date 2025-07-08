// Global variables
let jobData = [];
let filteredData = [];
let userProfile = {};
let userKeywords = [];

// Keywords untuk matching berdasarkan bidang
const skillKeywords = {
    'programming': ['javascript', 'python', 'java', 'php', 'c++', 'c#', 'golang', 'rust', 'kotlin', 'swift'],
    'web': ['html', 'css', 'react', 'vue', 'angular', 'node.js', 'express', 'laravel', 'django', 'bootstrap', 'tailwind'],
    'mobile': ['android', 'ios', 'flutter', 'react native', 'xamarin', 'ionic'],
    'data': ['data science', 'data analysis', 'machine learning', 'ai', 'artificial intelligence', 'python', 'r', 'sql', 'tableau', 'power bi'],
    'design': ['ui/ux', 'ui', 'ux', 'figma', 'adobe xd', 'sketch', 'photoshop', 'illustrator', 'design thinking', 'designer', 'design'],
    'database': ['mysql', 'postgresql', 'mongodb', 'sqlite', 'oracle', 'sql server'],
    'cloud': ['aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'devops'],
    'security': ['cyber security', 'network security', 'penetration testing', 'ethical hacking'],
    'marketing': ['digital marketing', 'seo', 'sem', 'social media', 'content marketing', 'email marketing'],
    'business': ['business analysis', 'project management', 'consulting', 'strategy', 'operations', 'management', 'manajemen']
};

// Bidang mapping
const bidangMapping = {
    'teknologi informasi': ['programming', 'web', 'mobile', 'data', 'database', 'cloud', 'security'],
    'sistem informasi': ['programming', 'web', 'database', 'business'],
    'teknik informatika': ['programming', 'web', 'mobile', 'data', 'cloud', 'security'],
    'desain': ['design'],
    'manajemen': ['business', 'marketing'],
    'ekonomi': ['business', 'data'],
    'matematika': ['data', 'programming'],
    'statistika': ['data', 'programming']
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadJobData();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('analyzeBtn').addEventListener('click', analyzeProfile);
    document.getElementById('resetProfileBtn').addEventListener('click', resetProfileForm);

    document.getElementById('filterProvinsi').addEventListener('change', applyFilters);
    document.getElementById('filterBidang').addEventListener('change', applyFilters);
    document.getElementById('filterMitra').addEventListener('change', applyFilters);
    document.getElementById('resetFilter').addEventListener('click', resetFilters);
}

function loadJobData() {
    fetch('lowongan_simbelmawa_normalisasi_final.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    jobData = results.data;
                    filteredData = [...jobData];
                    initializeApp();
                }
            });
        })
        .catch(error => {
            console.warn('CSV gagal dimuat, menggunakan sample data.', error);
            createSampleData();
            initializeApp();
        });
}

function createSampleData() {
    jobData = [
        {
            'Posisi': 'Web Developer',
            'Mitra': 'PT Teknologi Indonesia',
            'Bidang': 'Teknologi Informasi',
            'Provinsi': 'DKI Jakarta',
            'Kabupaten_Kota': 'Jakarta Selatan',
            'Kecamatan': 'Kebayoran Baru',
            'Deskripsi': 'Mengembangkan aplikasi web menggunakan React dan Node.js'
        },
        {
            'Posisi': 'UI/UX Designer',
            'Mitra': 'PT Digital Creative',
            'Bidang': 'Desain Grafis',
            'Provinsi': 'DKI Jakarta',
            'Kabupaten_Kota': 'Jakarta Pusat',
            'Kecamatan': 'Menteng',
            'Deskripsi': 'Mendesain interface aplikasi mobile dengan Figma'
        }
    ];
    filteredData = [...jobData];
}

function initializeApp() {
    hideLoading();
    showCards();
    updateStatistics();
    createCharts();
    createWordCloud();
    populateFilters();
    updateJobTable();
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showCards() {
    const cards = ['statsCard', 'profileCard', 'chartsContainer', 'wordcloudCard', 'filterCard', 'resultsCard'];
    cards.forEach(cardId => {
        const element = document.getElementById(cardId);
        if (element) {
            element.style.display = 'block';
        }
    });
}

function updateStatistics() {
    const totalLowongan = jobData.length;
    const totalMitra = new Set(jobData.map(job => job.Mitra)).size;
    const totalProvinsi = new Set(jobData.map(job => job.Provinsi)).size;
    const totalBidang = new Set(jobData.map(job => job.Bidang)).size;
    
    document.getElementById('totalLowongan').textContent = totalLowongan;
    document.getElementById('totalMitra').textContent = totalMitra;
    document.getElementById('totalProvinsi').textContent = totalProvinsi;
    document.getElementById('totalBidang').textContent = totalBidang;
}

function createCharts() {
    createMitraChart();
    createProvinsiChart();
    createBidangChart();
}

function createMitraChart() {
    const mitraCount = {};
    jobData.forEach(job => {
        mitraCount[job.Mitra] = (mitraCount[job.Mitra] || 0) + 1;
    });
    
    const sortedMitra = Object.entries(mitraCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    const ctx = document.getElementById('mitraChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedMitra.map(([mitra]) => mitra),
            datasets: [{
                label: 'Jumlah Lowongan',
                data: sortedMitra.map(([,count]) => count),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createProvinsiChart() {
    const provinsiCount = {};
    jobData.forEach(job => {
        provinsiCount[job.Provinsi] = (provinsiCount[job.Provinsi] || 0) + 1;
    });
    
    const sortedProvinsi = Object.entries(provinsiCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    const ctx = document.getElementById('provinsiChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedProvinsi.map(([provinsi]) => provinsi),
            datasets: [{
                label: 'Jumlah Lowongan',
                data: sortedProvinsi.map(([,count]) => count),
                backgroundColor: 'rgba(118, 75, 162, 0.8)',
                borderColor: 'rgba(118, 75, 162, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createBidangChart() {
    const bidangCount = {};
    jobData.forEach(job => {
        bidangCount[job.Bidang] = (bidangCount[job.Bidang] || 0) + 1;
    });
    
    const sortedBidang = Object.entries(bidangCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    const ctx = document.getElementById('bidangChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedBidang.map(([bidang]) => bidang),
            datasets: [{
                data: sortedBidang.map(([,count]) => count),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createWordCloud() {
    const allText = jobData.map(job => `${job.Posisi}`).join(' ');
    
    const words = allText.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3);
    
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    const sortedWords = Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 30);
    
    const wordCloudContainer = document.getElementById('wordcloud');
    wordCloudContainer.innerHTML = '';
    
    sortedWords.forEach(([word, count]) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.fontSize = `${Math.min(count * 4 + 12, 32)}px`;
        span.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        span.style.margin = '5px';
        span.style.display = 'inline-block';
        span.style.fontWeight = 'bold';
        wordCloudContainer.appendChild(span);
    });
}

function populateFilters() {
    // Populate Provinsi filter
    const provinsiOptions = [...new Set(jobData.map(job => job.Provinsi))].sort();
    const provinsiSelect = document.getElementById('filterProvinsi');
    provinsiSelect.innerHTML = '<option value="">Semua Provinsi</option>';
    provinsiOptions.forEach(provinsi => {
        const option = document.createElement('option');
        option.value = provinsi;
        option.textContent = provinsi;
        provinsiSelect.appendChild(option);
    });
    
    // Populate Bidang filter
    const bidangOptions = [...new Set(jobData.map(job => job.Bidang))].sort();
    const bidangSelect = document.getElementById('filterBidang');
    bidangSelect.innerHTML = '<option value="">Semua Bidang</option>';
    bidangOptions.forEach(bidang => {
        const option = document.createElement('option');
        option.value = bidang;
        option.textContent = bidang;
        bidangSelect.appendChild(option);
    });
    
    // Populate Mitra filter
    const mitraOptions = [...new Set(jobData.map(job => job.Mitra))].sort();
    const mitraSelect = document.getElementById('filterMitra');
    mitraSelect.innerHTML = '<option value="">Semua Mitra</option>';
    mitraOptions.forEach(mitra => {
        const option = document.createElement('option');
        option.value = mitra;
        option.textContent = mitra;
        mitraSelect.appendChild(option);
    });
}

function applyFilters() {
    const provinsiFilter = document.getElementById('filterProvinsi').value;
    const bidangFilter = document.getElementById('filterBidang').value;
    const mitraFilter = document.getElementById('filterMitra').value;
    
    filteredData = jobData.filter(job => {
        return (!provinsiFilter || job.Provinsi === provinsiFilter) &&
               (!bidangFilter || job.Bidang === bidangFilter) &&
               (!mitraFilter || job.Mitra === mitraFilter);
    });
    
    updateJobTable();
    updateFilteredStatistics();
}

function resetFilters() {
    document.getElementById('filterProvinsi').value = '';
    document.getElementById('filterBidang').value = '';
    document.getElementById('filterMitra').value = '';
    
    filteredData = [...jobData];
    updateJobTable();
    updateFilteredStatistics();
}

function updateFilteredStatistics() {
    const filteredCount = filteredData.length;
    const resultInfo = document.getElementById('resultInfo');
    if (resultInfo) {
        resultInfo.textContent = `Menampilkan ${filteredCount} dari ${jobData.length} lowongan`;
    }
}

function updateJobTable() {
    const tableBody = document.getElementById('jobTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    filteredData.forEach((job, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${job.Posisi}</td>
            <td>${job.Mitra}</td>
            <td>${job.Bidang}</td>
            <td>${job.Provinsi}</td>
            <td>${job.Kabupaten_Kota || '-'}</td>
            <td>${job.matchPercentage || 0}%</td>
        `;
        tableBody.appendChild(row);
    });
    
    updateFilteredStatistics();
}

function showJobDetail(index) {
    const job = filteredData[index];
    const modal = document.getElementById('jobDetailModal');
    const modalBody = document.getElementById('jobDetailBody');
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Posisi</h6>
                <p>${job.Posisi}</p>
            </div>
            <div class="col-md-6">
                <h6>Mitra</h6>
                <p>${job.Mitra}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h6>Bidang</h6>
                <p>${job.Bidang}</p>
            </div>
            <div class="col-md-6">
                <h6>Provinsi</h6>
                <p>${job.Provinsi}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h6>Kabupaten/Kota</h6>
                <p>${job.Kabupaten_Kota || '-'}</p>
            </div>
            <div class="col-md-6">
                <h6>Kecamatan</h6>
                <p>${job.Kecamatan || '-'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h6>Deskripsi</h6>
                <p>${job.Deskripsi || 'Tidak ada deskripsi'}</p>
            </div>
        </div>
    `;
    
    // Show modal using Bootstrap
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

// FIXED PROFILE ANALYSIS FUNCTIONS
function analyzeProfile() {
    const nama = document.getElementById('nama').value.trim();
    const jurusan = document.getElementById('jurusan').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();
    
    if (!nama || !jurusan || !skills) {
        alert('Mohon lengkapi semua field yang wajib diisi!');
        return;
    }
    
    userProfile = {
        nama,
        jurusan: jurusan.toLowerCase(),
        skills: skills.toLowerCase().split(',').map(s => s.trim()),
        lokasi
    };
    
    // Generate user keywords based on profile
    generateUserKeywords();
    
    // Find matching jobs with improved algorithm
    const matchingJobs = findMatchingJobs();
    
    // Display results
    displayProfileAnalysis(matchingJobs);
    
    // Show recommendations
    showRecommendations(matchingJobs);
}

function generateUserKeywords() {
    userKeywords = [];
    
    // Add keywords based on jurusan
    const jurusanKey = Object.keys(bidangMapping).find(key => 
        userProfile.jurusan.includes(key)
    );
    
    if (jurusanKey) {
        const relatedSkills = bidangMapping[jurusanKey];
        relatedSkills.forEach(skillCategory => {
            if (skillKeywords[skillCategory]) {
                userKeywords.push(...skillKeywords[skillCategory]);
            }
        });
    }
    
    // Add user-specified skills
    userKeywords.push(...userProfile.skills);
    
    // Remove duplicates
    userKeywords = [...new Set(userKeywords)];
}

function findMatchingJobs() {
    const matchingJobs = jobData.map(job => {
        const jobText = `${job.Posisi} ${job.Bidang} ${job.Deskripsi || ''}`.toLowerCase();
        let matchScore = 0;
        let matchedKeywords = [];
        
        // Check keyword matches with more sophisticated scoring
        userKeywords.forEach(keyword => {
            if (jobText.includes(keyword)) {
                // Different weights for different types of matches
                if (job.Posisi.toLowerCase().includes(keyword)) {
                    matchScore += 3; // Higher weight for position matches
                } else if (job.Bidang.toLowerCase().includes(keyword)) {
                    matchScore += 2; // Medium weight for field matches
                } else {
                    matchScore += 1; // Lower weight for description matches
                }
                matchedKeywords.push(keyword);
            }
        });
        
        // Location bonus
        if (userProfile.lokasi && job.Provinsi && 
            job.Provinsi.toLowerCase().includes(userProfile.lokasi.toLowerCase())) {
            matchScore += 2;
        }
        
        // Calculate match percentage based on user skills only (not auto-generated keywords)
        const userSkillsMatched = userProfile.skills.filter(skill => 
            jobText.includes(skill)
        ).length;
        
        const skillMatchPercentage = userProfile.skills.length > 0 ? 
            Math.round((userSkillsMatched / userProfile.skills.length) * 100) : 0;
        
        return {
            ...job,
            matchScore,
            matchedKeywords: [...new Set(matchedKeywords)], // Remove duplicates
            matchPercentage: skillMatchPercentage
        };
    }).filter(job => job.matchScore > 0) // Only include jobs with actual matches
      .sort((a, b) => {
          // Sort by match score first, then by match percentage
          if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
          }
          return b.matchPercentage - a.matchPercentage;
      });
    
    return matchingJobs;
}

function displayProfileAnalysis(matchingJobs) {
    const analysisResult = document.getElementById('analysisResult');
    const totalMatches = matchingJobs.length;
    const topMatches = matchingJobs.slice(0, 5);
    
    let resultHTML = `
        <div class="alert alert-success">
            <h5>✅ Analisis Profil Selesai!</h5>
            <p>Ditemukan <strong>${totalMatches}</strong> lowongan yang cocok dengan profil Anda.</p>
            <small>Berdasarkan: ${userProfile.skills.join(', ')}</small>
        </div>
    `;
    
    if (topMatches.length > 0) {
        resultHTML += `
            <h6>🎯 Top 5 Lowongan yang Paling Cocok:</h6>
            <div class="list-group">
        `;
        
        topMatches.forEach((job, index) => {
            const matchBadge = job.matchPercentage >= 50 ? 'success' : 
                             job.matchPercentage >= 25 ? 'warning' : 'secondary';
            
            resultHTML += `
                <div class="list-group-item">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">${job.Posisi}</h6>
                        <span class="badge bg-${matchBadge}">${job.matchPercentage}% match</span>
                    </div>
                    <p class="mb-1"><strong>${job.Mitra}</strong> - ${job.Provinsi}</p>
                    <small class="text-muted">Bidang: ${job.Bidang}</small><br>
                    <small class="text-info">Matched: ${job.matchedKeywords.slice(0, 5).join(', ')}</small>
                </div>
            `;
        });
        
        resultHTML += '</div>';
    }
    
    analysisResult.innerHTML = resultHTML;
    analysisResult.style.display = 'block';
}

function showRecommendations(matchingJobs) {
    const recommendationsDiv = document.getElementById('recommendations');
    const recommendationsCard = document.getElementById('recommendationsCard');
    
    if (matchingJobs.length === 0) {
        recommendationsDiv.innerHTML = `
            <div class="alert alert-warning">
                <h6>❌ Tidak ada lowongan yang cocok</h6>
                <p>Coba perluas skill set atau ubah preferensi lokasi Anda.</p>
            </div>
        `;
        recommendationsCard.style.display = 'block';
        return;
    }
    
    // Analyze recommendations
    const skillGaps = analyzeSkillGaps(matchingJobs);
    const locationInsights = analyzeLocationInsights(matchingJobs);
    const fieldInsights = analyzeFieldInsights(matchingJobs);
    
    let recommendationHTML = `
        <div class="alert alert-info">
            <h6>💡 Rekomendasi Pengembangan Karir:</h6>
            <ul class="mb-0">
    `;
    
    // Skill recommendations
    if (skillGaps.length > 0) {
        recommendationHTML += `
            <li><strong>Skill yang Perlu Dikembangkan:</strong> ${skillGaps.slice(0, 5).join(', ')}</li>
        `;
    }
    
    // Location recommendations
    if (locationInsights.length > 0) {
        recommendationHTML += `
            <li><strong>Lokasi dengan Peluang Terbanyak:</strong> ${locationInsights.slice(0, 3).join(', ')}</li>
        `;
    }
    
    // Field recommendations
    if (fieldInsights.length > 0) {
        recommendationHTML += `
            <li><strong>Bidang dengan Permintaan Tinggi:</strong> ${fieldInsights.slice(0, 3).join(', ')}</li>
        `;
    }
    
    // General recommendations
    recommendationHTML += `
            <li><strong>Saran Umum:</strong> Update LinkedIn, buat portofolio online, ikuti webinar industri</li>
            <li><strong>Networking:</strong> Bergabung dengan komunitas profesional di bidang Anda</li>
        </ul>
        </div>
    `;
    
    recommendationsDiv.innerHTML = recommendationHTML;
    recommendationsCard.style.display = 'block';
}

function analyzeSkillGaps(matchingJobs) {
    const allJobTexts = matchingJobs.map(job => 
        `${job.Posisi} ${job.Bidang} ${job.Deskripsi || ''}`.toLowerCase()
    ).join(' ');
    
    const skillGaps = [];
    const userSkillsLower = userProfile.skills.map(s => s.toLowerCase());
    
    // Find skills that appear frequently in job descriptions but user doesn't have
    Object.values(skillKeywords).flat().forEach(skill => {
        if (!userSkillsLower.includes(skill.toLowerCase()) && 
            allJobTexts.includes(skill.toLowerCase())) {
            
            // Count frequency
            const frequency = (allJobTexts.match(new RegExp(skill.toLowerCase(), 'g')) || []).length;
            if (frequency > 2) { // Only suggest skills that appear multiple times
                skillGaps.push(skill);
            }
        }
    });
    
    return skillGaps;
}

function analyzeLocationInsights(matchingJobs) {
    const locationCount = {};
    matchingJobs.forEach(job => {
        locationCount[job.Provinsi] = (locationCount[job.Provinsi] || 0) + 1;
    });
    
    return Object.entries(locationCount)
        .sort(([,a], [,b]) => b - a)
        .map(([location]) => location);
}

function analyzeFieldInsights(matchingJobs) {
    const fieldCount = {};
    matchingJobs.forEach(job => {
        fieldCount[job.Bidang] = (fieldCount[job.Bidang] || 0) + 1;
    });
    
    return Object.entries(fieldCount)
        .sort(([,a], [,b]) => b - a)
        .map(([field]) => field);
}

function resetProfileForm() {
    document.getElementById('profileForm').reset();
    document.getElementById('analysisResult').style.display = 'none';
    document.getElementById('recommendationsCard').style.display = 'none';
    userProfile = {};
    userKeywords = [];
}

// Export functions for external use
window.jobAnalyzer = {
    loadJobData,
    analyzeProfile,
    applyFilters,
    resetFilters,
    showJobDetail
};