// DOM Elements
const courseTableBody = document.getElementById('course-table-body');
const optimizeForm = document.getElementById('optimize-form');
const maxSksInput = document.getElementById('max-sks');
const resultsSection = document.getElementById('results-section');
const resultsGrid = document.getElementById('results-grid');
const resultCount = document.getElementById('result-count');
const detailModal = document.getElementById('detail-modal');
const modalContent = document.getElementById('modal-content');

// Load courses on startup
document.addEventListener('DOMContentLoaded', loadCourses);

async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const result = await response.json();

        if (result.message === 'success') {
            renderCourses(result.data);
        }
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function renderCourses(courses) {
    courseTableBody.innerHTML = '';
    courses.forEach(course => {
        const row = document.createElement('tr');
        row.className = 'group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors border-b border-gray-50 dark:border-gray-800';

        // Color per day (simple cycle)
        let dayColor = "gray";
        if (course.day === "Senin") dayColor = "blue";
        if (course.day === "Selasa") dayColor = "emerald";
        if (course.day === "Rabu") dayColor = "violet";
        if (course.day === "Kamis") dayColor = "amber";
        if (course.day === "Jumat") dayColor = "rose";

        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">${course.code}</td>
            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">${course.name}</td>
            <td class="px-6 py-4 text-center text-gray-900 dark:text-white">${course.semester}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${dayColor}-100 text-${dayColor}-800 dark:bg-${dayColor}-900 dark:text-${dayColor}-200 border border-${dayColor}-200 dark:border-${dayColor}-800">
                    ${course.day}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-500 dark:text-gray-400 tabular-nums">${course.start_time} - ${course.end_time}</td>
            <td class="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">${course.sks}</td>
            <td class="px-6 py-4 text-right">
                <button onclick="deleteCourse(${course.id})" class="text-gray-400 hover:text-red-500 transition-colors group-hover:opacity-100">
                    <span class="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </td>
        `;
        courseTableBody.appendChild(row);
    });
}

// Add Course Modal Logic
const addCourseModal = document.getElementById('add-course-modal');
const addCourseForm = document.getElementById('add-course-form');

window.openAddModal = function () {
    addCourseModal.classList.remove('hidden');
}

window.closeAddModal = function () {
    addCourseModal.classList.add('hidden');
}

addCourseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCourseForm);
    const data = Object.fromEntries(formData.entries());

    // Auto calculate if not needed or validate?
    // Just send
    try {
        const response = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            closeAddModal();
            addCourseForm.reset();
            loadCourses(); // Refresh table
        } else {
            alert('Gagal menambah mata kuliah');
        }
    } catch (error) {
        console.error('Error adding course:', error);
    }
});

async function deleteCourse(id) {
    if (!confirm('Apakah anda yakin ingin menghapus mata kuliah ini?')) return;

    try {
        const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
        if (response.ok) {
            loadCourses(); // Refresh table
        } else {
            alert('Gagal menghapus mata kuliah');
        }
    } catch (error) {
        console.error('Error deleting course:', error);
    }
}

// Handle Form Submission
optimizeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const maxSKS = parseInt(maxSksInput.value);
    const semester = parseInt(document.getElementById('semester-select').value);

    // Show loading state could go here

    try {
        const response = await fetch('/api/optimize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ maxSKS, semester })
        });
        const result = await response.json();

        if (result.message === 'success') {
            renderResults(result.data);
        }
    } catch (error) {
        console.error('Error optimizing schedule:', error);
    }
});

function renderResults(combinations) {
    resultsSection.classList.remove('hidden');
    resultCount.textContent = `${combinations.length} Opsi Ditemukan`;
    resultsGrid.innerHTML = '';

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    combinations.forEach((combo, index) => {
        const totalSKS = combo.reduce((sum, c) => sum + c.sks, 0);
        const courseNames = combo.map(c => c.name).join(', ');

        const card = document.createElement('div');
        card.className = 'result-card bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden hover:-translate-y-1';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div class="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                <h3 class="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary transition-colors">Opsi Jadwal ${index + 1}</h3>
                <div class="flex flex-col items-end">
                    <span class="text-2xl font-bold text-primary tabular-nums leading-none">${totalSKS}</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1">Total SKS</span>
                </div>
            </div>
            <div class="p-5">
                <div class="space-y-4 mb-6">
                    <div class="flex items-start gap-3">
                        <div class="bg-green-100 dark:bg-green-900/30 p-1 rounded-full shrink-0">
                            <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-[18px] block">check_circle</span>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">${combo.length} Mata Kuliah</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed line-clamp-2">${courseNames}</p>
                        </div>
                    </div>
                </div>
                <button onclick='showDetail(${JSON.stringify(combo)})' class="w-full py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-primary dark:hover:bg-primary/20 transition-all flex items-center justify-center gap-2">
                    Lihat Detail
                    <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

window.showDetail = function (combo) {
    modalContent.innerHTML = '';

    // Sort by day/time for better view
    const dayOrder = { "Senin": 1, "Selasa": 2, "Rabu": 3, "Kamis": 4, "Jumat": 5, "Sabtu": 6, "Minggu": 7 };

    combo.sort((a, b) => {
        if (dayOrder[a.day] !== dayOrder[b.day]) return dayOrder[a.day] - dayOrder[b.day];
        return a.start_time.localeCompare(b.start_time);
    });

    combo.forEach(course => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 dark:border-gray-600';
        row.innerHTML = `
            <td class="px-3 py-2 text-gray-900 dark:text-white font-medium">${course.name} <div class="text-xs text-gray-500 font-normal">${course.code}</div></td>
            <td class="px-3 py-2 text-center text-gray-900 dark:text-white">${course.semester}</td>
            <td class="px-3 py-2 text-gray-600 dark:text-gray-300 text-sm">${course.day}</td>
            <td class="px-3 py-2 text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">${course.start_time} - ${course.end_time}</td>
            <td class="px-3 py-2 text-center text-gray-900 dark:text-white font-medium">${course.sks}</td>
        `;
        modalContent.appendChild(row);
    });

    detailModal.classList.remove('hidden');
}

window.closeModal = function () {
    detailModal.classList.add('hidden');
}
