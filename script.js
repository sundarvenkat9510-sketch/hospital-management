/**
 * CarePoint Hospital Bed & Seat Arrangement Management System
 * Pure Vanilla JavaScript with LocalStorage Data Persistence
 */

// ==========================================================================
// 1. Initial Sample Hospital Data (Seed Data)
// ==========================================================================
const DEFAULT_BEDS = [
  // General Ward (7 Beds)
  {
    id: "GW-101",
    number: "GW-101",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "occupied",
    patientId: "PT-1001",
    reservedInfo: null,
    lastSanitized: "2026-10-15 09:30 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Call Bell"]
  },
  {
    id: "GW-102",
    number: "GW-102",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 07:15 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Call Bell"]
  },
  {
    id: "GW-103",
    number: "GW-103",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "occupied",
    patientId: "PT-1002",
    reservedInfo: null,
    lastSanitized: "2026-10-14 02:45 PM",
    equipment: ["Oxygen Supply", "IV Stand", "Call Bell"]
  },
  {
    id: "GW-104",
    number: "GW-104",
    ward: "General Ward",
    type: "Adjustable Electric Bed",
    floor: "1st Floor - Wing A",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 08:30 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Adjustable Remote"]
  },
  {
    id: "GW-105",
    number: "GW-105",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "occupied",
    patientId: "PT-1003",
    reservedInfo: null,
    lastSanitized: "2026-10-14 11:20 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Call Bell"]
  },
  {
    id: "GW-106",
    number: "GW-106",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 06:00 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Call Bell"]
  },
  {
    id: "GW-107",
    number: "GW-107",
    ward: "General Ward",
    type: "Standard Hospital Bed",
    floor: "1st Floor - Wing A",
    status: "reserved",
    patientId: null,
    reservedInfo: {
      name: "Marcus Ward",
      reason: "Scheduled Knee Arthroscopy Post-Op",
      contact: "+1 (555) 432-1098"
    },
    lastSanitized: "Today, 07:45 AM",
    equipment: ["Oxygen Supply", "IV Stand", "Post-Op Monitor"]
  },

  // ICU - Intensive Care Unit (4 Beds)
  {
    id: "ICU-01",
    number: "ICU-01",
    ward: "ICU",
    type: "Advanced Critical Care Bed",
    floor: "2nd Floor - Critical Wing",
    status: "occupied",
    patientId: "PT-1004",
    reservedInfo: null,
    lastSanitized: "2026-10-15 08:00 AM",
    equipment: ["Mechanical Ventilator", "Multipara Cardiac Monitor", "Infusion Pumps", "Crash Cart Nearby"]
  },
  {
    id: "ICU-02",
    number: "ICU-02",
    ward: "ICU",
    type: "Advanced Critical Care Bed",
    floor: "2nd Floor - Critical Wing",
    status: "occupied",
    patientId: "PT-1005",
    reservedInfo: null,
    lastSanitized: "2026-10-15 01:15 PM",
    equipment: ["Mechanical Ventilator", "Telemetry", "Suction Unit", "Defibrillator"]
  },
  {
    id: "ICU-03",
    number: "ICU-03",
    ward: "ICU",
    type: "Cardiac Recovery Bed",
    floor: "2nd Floor - Critical Wing",
    status: "reserved",
    patientId: null,
    reservedInfo: {
      name: "Harold Finch",
      reason: "Post-CABG Surgery Admission Hold",
      contact: "+1 (555) 987-6543"
    },
    lastSanitized: "Today, 09:00 AM",
    equipment: ["Ventilator Ready", "Invasive Blood Pressure Monitor"]
  },
  {
    id: "ICU-04",
    number: "ICU-04",
    ward: "ICU",
    type: "Advanced Critical Care Bed",
    floor: "2nd Floor - Critical Wing",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 10:15 AM",
    equipment: ["Full ICU Setup", "Oxygen & Suction Ports", "Central Line Ready"]
  },

  // Emergency Ward (4 Beds)
  {
    id: "EM-201",
    number: "EM-201",
    ward: "Emergency Ward",
    type: "Trauma & Resuscitation Gurney",
    floor: "Ground Floor - ER Bay 1",
    status: "occupied",
    patientId: "PT-1006",
    reservedInfo: null,
    lastSanitized: "Today, 05:40 AM",
    equipment: ["Rapid Infuser", "Defibrillator", "Portable X-Ray Access"]
  },
  {
    id: "EM-202",
    number: "EM-202",
    ward: "Emergency Ward",
    type: "Triage Observation Bed",
    floor: "Ground Floor - ER Bay 2",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 09:45 AM",
    equipment: ["Oxygen Flowmeter", "Vitals Monitor", "IV Pole"]
  },
  {
    id: "EM-203",
    number: "EM-203",
    ward: "Emergency Ward",
    type: "Triage Observation Bed",
    floor: "Ground Floor - ER Bay 3",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 11:00 AM",
    equipment: ["Oxygen Flowmeter", "Vitals Monitor", "IV Pole"]
  },
  {
    id: "EM-204",
    number: "EM-204",
    ward: "Emergency Ward",
    type: "Emergency Observation Bed",
    floor: "Ground Floor - ER Bay 4",
    status: "occupied",
    patientId: "PT-1007",
    reservedInfo: null,
    lastSanitized: "Today, 08:10 AM",
    equipment: ["Oxygen Supply", "Continuous ECG Monitor", "IV Stand"]
  },

  // Private Rooms (3 Rooms/Beds)
  {
    id: "PR-301",
    number: "PR-301",
    ward: "Private Rooms",
    type: "Deluxe Single Recovery Suite",
    floor: "3rd Floor - Suite Wing",
    status: "occupied",
    patientId: "PT-1008",
    reservedInfo: null,
    lastSanitized: "2026-10-14 04:00 PM",
    equipment: ["Smart Bed Controller", "En-suite Bathroom", "Oxygen Port", "Companion Couch"]
  },
  {
    id: "PR-302",
    number: "PR-302",
    ward: "Private Rooms",
    type: "Executive Patient Suite",
    floor: "3rd Floor - Suite Wing",
    status: "available",
    patientId: null,
    reservedInfo: null,
    lastSanitized: "Today, 08:00 AM",
    equipment: ["Smart Bed Controller", "Private Restroom", "Dedicated Nursing Call"]
  },
  {
    id: "PR-303",
    number: "PR-303",
    ward: "Private Rooms",
    type: "Deluxe Single Recovery Suite",
    floor: "3rd Floor - Suite Wing",
    status: "reserved",
    patientId: null,
    reservedInfo: {
      name: "Victoria Sterling",
      reason: "Scheduled Elective Procedure - Dr. Sarah Jenkins",
      contact: "+1 (555) 765-4321"
    },
    lastSanitized: "Today, 09:30 AM",
    equipment: ["Full Deluxe Setup", "Sanitized & Sealed"]
  }
];

const DEFAULT_PATIENTS = [
  {
    id: "PT-1001",
    name: "Eleanor Vance",
    age: 42,
    gender: "Female",
    contact: "+1 (555) 234-5678",
    admissionDate: "2026-10-14T09:30",
    ward: "General Ward",
    bedId: "GW-101",
    doctor: "Dr. Robert Chen (Chief Surgeon)",
    diagnosis: "Post-operative appendectomy observation; wound healing well, on oral analgesics."
  },
  {
    id: "PT-1002",
    name: "Marcus Brody",
    age: 58,
    gender: "Male",
    contact: "+1 (555) 345-6789",
    admissionDate: "2026-10-14T14:15",
    ward: "General Ward",
    bedId: "GW-103",
    doctor: "Dr. Michael Patel (Internal Med)",
    diagnosis: "Pneumonia with moderate fever; antibiotics IV administered, responding favorably."
  },
  {
    id: "PT-1003",
    name: "Sophia Martinez",
    age: 29,
    gender: "Female",
    contact: "+1 (555) 456-7890",
    admissionDate: "2026-10-15T11:00",
    ward: "General Ward",
    bedId: "GW-105",
    doctor: "Dr. Robert Chen (Chief Surgeon)",
    diagnosis: "Fractured right tibia post-fall; cast applied, physical therapy consult scheduled."
  },
  {
    id: "PT-1004",
    name: "Arthur Pendelton",
    age: 67,
    gender: "Male",
    contact: "+1 (555) 567-8901",
    admissionDate: "2026-10-13T18:45",
    ward: "ICU",
    bedId: "ICU-01",
    doctor: "Dr. Sarah Jenkins (Critical Care)",
    diagnosis: "Acute coronary syndrome under telemetry; hemodynamic stability returning."
  },
  {
    id: "PT-1005",
    name: "David Sterling",
    age: 72,
    gender: "Male",
    contact: "+1 (555) 678-9012",
    admissionDate: "2026-10-15T02:30",
    ward: "ICU",
    bedId: "ICU-02",
    doctor: "Dr. Sarah Jenkins (Critical Care)",
    diagnosis: "COPD exacerbation with secondary hypercapnia; CPAP supported."
  },
  {
    id: "PT-1006",
    name: "Liam Gallagher",
    age: 34,
    gender: "Male",
    contact: "+1 (555) 789-0123",
    admissionDate: "2026-10-16T06:10",
    ward: "Emergency Ward",
    bedId: "EM-201",
    doctor: "Dr. Lisa Ray (Emergency Specialist)",
    diagnosis: "Motor vehicle collision contusions; full trauma scan cleared major fractures, under observation."
  },
  {
    id: "PT-1007",
    name: "Emily Watson",
    age: 51,
    gender: "Female",
    contact: "+1 (555) 890-1234",
    admissionDate: "2026-10-16T08:00",
    ward: "Emergency Ward",
    bedId: "EM-204",
    doctor: "Dr. Lisa Ray (Emergency Specialist)",
    diagnosis: "Severe gastroenteritis and electrolyte imbalance; IV hydration therapy in progress."
  },
  {
    id: "PT-1008",
    name: "Clara Oswald",
    age: 38,
    gender: "Female",
    contact: "+1 (555) 901-2345",
    admissionDate: "2026-10-14T15:20",
    ward: "Private Rooms",
    bedId: "PR-301",
    doctor: "Dr. Robert Chen (Chief Surgeon)",
    diagnosis: "Laparoscopic cholecystectomy elective procedure; recovery smooth, preparing for discharge."
  }
];

// ==========================================================================
// 2. Application State & LocalStorage Management
// ==========================================================================
const STORAGE_KEY_BEDS = "carepoint_hospital_beds_v1";
const STORAGE_KEY_PATIENTS = "carepoint_hospital_patients_v1";

let appState = {
  beds: [],
  patients: [],
  activeView: "dashboard",
  filters: {
    search: "",
    ward: "all",
    status: "all"
  },
  patientSearch: "",
  selectedDischarge: null // Holds patient & bed id slated for discharge
};

/**
 * Initializes state from browser localStorage or seeds default sample data.
 */
function initData() {
  try {
    const storedBeds = localStorage.getItem(STORAGE_KEY_BEDS);
    const storedPatients = localStorage.getItem(STORAGE_KEY_PATIENTS);

    if (storedBeds && storedPatients) {
      appState.beds = JSON.parse(storedBeds);
      appState.patients = JSON.parse(storedPatients);
    } else {
      seedDefaultData();
    }
  } catch (error) {
    console.error("Failed to parse localStorage data, restoring defaults:", error);
    seedDefaultData();
  }
}

/**
 * Persists current state to localStorage.
 */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY_BEDS, JSON.stringify(appState.beds));
    localStorage.setItem(STORAGE_KEY_PATIENTS, JSON.stringify(appState.patients));
  } catch (error) {
    console.error("Failed to write to localStorage:", error);
  }
}

/**
 * Seeds and writes default clinical sample data.
 */
function seedDefaultData() {
  appState.beds = JSON.parse(JSON.stringify(DEFAULT_BEDS));
  appState.patients = JSON.parse(JSON.stringify(DEFAULT_PATIENTS));
  saveData();
}

/**
 * Resets state back to factory default sample data.
 */
function resetDemoData() {
  if (confirm("Reset demo data to initial factory state? Any new test patients or assignments will be restored to defaults.")) {
    seedDefaultData();
    refreshAllViews();
    showToast("System Reset", "Demo hospital bed and patient records have been restored.", "bi-arrow-counterclockwise", "text-primary");
  }
}

// ==========================================================================
// 3. Navigation & View Switching
// ==========================================================================
function switchView(viewName) {
  appState.activeView = viewName;

  // Toggle navigation links
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Toggle view sections
  document.querySelectorAll(".view-section").forEach(section => {
    section.classList.remove("active-view");
  });

  const activeSection = document.getElementById(`view-${viewName}`);
  if (activeSection) {
    activeSection.classList.add("active-view");
  }

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupSidebar() {
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const toggleBtn = document.getElementById("btn-toggle-sidebar");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
      sidebarBackdrop.classList.toggle("show");
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", closeMobileSidebar);
  }

  // Navigation click handlers
  document.querySelectorAll("[data-view]").forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      const view = elem.getAttribute("data-view");
      if (view) switchView(view);
    });
  });

  // Reset Demo button
  const resetBtn = document.getElementById("btn-reset-demo");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetDemoData);
  }

  // Topbar quick assign
  const topbarAssignBtn = document.getElementById("btn-topbar-quick-assign");
  if (topbarAssignBtn) {
    topbarAssignBtn.addEventListener("click", () => openAssignModal());
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.remove("show-sidebar");
  if (sidebarBackdrop) sidebarBackdrop.classList.remove("show");
}

// ==========================================================================
// 4. Dashboard View Rendering
// ==========================================================================
function renderDashboard() {
  const total = appState.beds.length;
  const available = appState.beds.filter(b => b.status === "available").length;
  const occupied = appState.beds.filter(b => b.status === "occupied").length;
  const reserved = appState.beds.filter(b => b.status === "reserved").length;

  const availPct = total > 0 ? Math.round((available / total) * 100) : 0;
  const occPct = total > 0 ? Math.round((occupied / total) * 100) : 0;
  const resPct = total > 0 ? Math.round((reserved / total) * 100) : 0;

  // Stat Cards
  document.getElementById("stat-total-beds").textContent = total;
  document.getElementById("stat-available-beds").textContent = available;
  document.getElementById("stat-available-pct").textContent = `${availPct}%`;

  document.getElementById("stat-occupied-beds").textContent = occupied;
  document.getElementById("stat-occupied-pct").textContent = `${occPct}%`;

  document.getElementById("stat-reserved-beds").textContent = reserved;
  document.getElementById("stat-reserved-pct").textContent = `${resPct}%`;

  // Topbar & Sidebar indicators
  document.getElementById("topbar-occupancy-rate").textContent = `${occPct}%`;
  document.getElementById("sidebar-total-beds").textContent = total;
  document.getElementById("sidebar-occupied-beds").textContent = occupied;

  // Visual Multi-segment Progress Bar
  const barOccupied = document.getElementById("bar-occupied");
  const barReserved = document.getElementById("bar-reserved");
  const barAvailable = document.getElementById("bar-available");

  if (barOccupied) barOccupied.style.width = `${occPct}%`;
  if (barReserved) barReserved.style.width = `${resPct}%`;
  if (barAvailable) barAvailable.style.width = `${availPct}%`;

  // Legend counts
  document.getElementById("legend-occupied-count").textContent = occupied;
  document.getElementById("legend-occupied-pct").textContent = `${occPct}%`;

  document.getElementById("legend-reserved-count").textContent = reserved;
  document.getElementById("legend-reserved-pct").textContent = `${resPct}%`;

  document.getElementById("legend-available-count").textContent = available;
  document.getElementById("legend-available-pct").textContent = `${availPct}%`;

  // Ward-by-Ward Breakdown
  renderWardBreakdown();

  // Recent Admissions Table on Dashboard
  renderDashboardRecentAdmissions();
}

/**
 * Calculates and displays ward-specific occupancy progress cards.
 */
function renderWardBreakdown() {
  const container = document.getElementById("ward-breakdown-cards");
  if (!container) return;

  const wards = [
    { name: "General Ward", icon: "bi-building", colorClass: "text-primary", barClass: "bg-primary" },
    { name: "ICU", icon: "bi-heart-pulse-fill", colorClass: "text-danger", barClass: "bg-danger" },
    { name: "Emergency Ward", icon: "bi-lightning-charge-fill", colorClass: "text-warning", barClass: "bg-warning" },
    { name: "Private Rooms", icon: "bi-shield-check", colorClass: "text-info", barClass: "bg-info" }
  ];

  let html = "";
  wards.forEach(w => {
    const wardBeds = appState.beds.filter(b => b.ward === w.name);
    const wardTotal = wardBeds.length;
    const wardOccupied = wardBeds.filter(b => b.status === "occupied").length;
    const wardAvailable = wardBeds.filter(b => b.status === "available").length;
    const wardReserved = wardBeds.filter(b => b.status === "reserved").length;
    const pct = wardTotal > 0 ? Math.round((wardOccupied / wardTotal) * 100) : 0;

    // Sidebar quick counts update
    if (w.name === "General Ward") document.getElementById("quick-gw-count").textContent = `${wardOccupied}/${wardTotal}`;
    if (w.name === "ICU") {
      document.getElementById("quick-icu-count").textContent = `${wardOccupied}/${wardTotal}`;
      document.getElementById("sidebar-icu-avail").textContent = `${wardAvailable} Available`;
    }
    if (w.name === "Emergency Ward") {
      document.getElementById("quick-em-count").textContent = `${wardOccupied}/${wardTotal}`;
      document.getElementById("sidebar-em-avail").textContent = `${wardAvailable} Available`;
    }
    if (w.name === "Private Rooms") document.getElementById("quick-pr-count").textContent = `${wardOccupied}/${wardTotal}`;

    html += `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="ward-overview-card cursor-pointer" onclick="quickFilterWard('${w.name}')" title="Click to filter by ${w.name}">
          <div class="ward-card-header">
            <span class="ward-name-badge">
              <i class="${w.icon} ${w.colorClass}"></i> ${w.name}
            </span>
            <span class="ward-capacity-badge">${wardOccupied}/${wardTotal} Beds</span>
          </div>
          <div class="ward-progress">
            <div class="ward-progress-bar ${w.barClass}" style="width: ${pct}%"></div>
          </div>
          <div class="ward-card-footer">
            <span class="text-success fw-semibold"><i class="bi-check-circle"></i> ${wardAvailable} Avail</span>
            <span class="text-muted">${pct}% Occupied</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renders the recent patient admissions list on the dashboard.
 */
function renderDashboardRecentAdmissions() {
  const tbody = document.getElementById("dashboard-recent-patients");
  if (!tbody) return;

  // Show up to 5 patients sorted by admission date descending
  const sortedPatients = [...appState.patients].sort((a, b) => {
    return new Date(b.admissionDate) - new Date(a.admissionDate);
  }).slice(0, 5);

  if (sortedPatients.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          <i class="bi-info-circle me-1"></i> No patients currently admitted.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = sortedPatients.map(patient => {
    const bed = appState.beds.find(b => b.id === patient.bedId);
    const wardName = bed ? bed.ward : patient.ward;
    const formattedDate = formatDateTime(patient.admissionDate);

    return `
      <tr>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(patient.name)}</div>
          <span class="text-muted font-monospace small">${escapeHtml(patient.id)}</span> &bull; <small>${patient.age}y / ${patient.gender}</small>
        </td>
        <td>
          <span class="badge bg-light text-secondary border">${escapeHtml(wardName)}</span>
        </td>
        <td>
          <span class="bed-tag">
            <i class="bi-hospital"></i> ${escapeHtml(patient.bedId)}
          </span>
        </td>
        <td>
          <div class="small">${formattedDate}</div>
          <small class="text-muted">${escapeHtml(patient.doctor || "Attending Physician")}</small>
        </td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-sm btn-outline-primary" onclick="viewBedDetails('${patient.bedId}')" title="View Patient Details">
              <i class="bi-eye"></i> Details
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="openDischargeModal('${patient.id}')" title="Discharge Patient">
              <i class="bi-box-arrow-right"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// ==========================================================================
// 5. Bed Arrangement View & Filtering
// ==========================================================================
function renderBedArrangement() {
  const container = document.getElementById("bed-arrangement-container");
  if (!container) return;

  const { search, ward, status } = appState.filters;

  // Filter beds based on search query, ward, and status
  const filteredBeds = appState.beds.filter(bed => {
    // 1. Ward filter
    if (ward !== "all" && bed.ward !== ward) {
      return false;
    }

    // 2. Status filter
    if (status !== "all" && bed.status !== status) {
      return false;
    }

    // 3. Search query: match bed number, ward, or patient name
    if (search.trim() !== "") {
      const q = search.toLowerCase().trim();
      const matchBed = bed.number.toLowerCase().includes(q);
      const matchWard = bed.ward.toLowerCase().includes(q);

      let matchPatient = false;
      if (bed.patientId) {
        const patient = appState.patients.find(p => p.id === bed.patientId);
        if (patient && (patient.name.toLowerCase().includes(q) || patient.id.toLowerCase().includes(q))) {
          matchPatient = true;
        }
      }

      let matchReserved = false;
      if (bed.reservedInfo && bed.reservedInfo.name.toLowerCase().includes(q)) {
        matchReserved = true;
      }

      if (!matchBed && !matchWard && !matchPatient && !matchReserved) {
        return false;
      }
    }

    return true;
  });

  // Update showing counter chip
  const counterChip = document.getElementById("beds-counter-chip");
  if (counterChip) {
    counterChip.textContent = `Showing ${filteredBeds.length} of ${appState.beds.length} Beds`;
  }

  // If no beds match filters
  if (filteredBeds.length === 0) {
    container.innerHTML = `
      <div class="card-clinical empty-state">
        <i class="bi-search empty-state-icon"></i>
        <h4 class="empty-state-title">No matching beds found</h4>
        <p class="empty-state-text">There are no beds matching your current search criteria or active filters.</p>
        <button class="btn btn-outline-hospital btn-sm" onclick="resetFilters()">
          <i class="bi-arrow-clockwise me-1"></i> Clear All Filters
        </button>
      </div>
    `;
    return;
  }

  // Group filtered beds by Ward
  const wardNames = ["General Ward", "ICU", "Emergency Ward", "Private Rooms"];
  let finalHtml = "";

  wardNames.forEach(wardName => {
    const wardBeds = filteredBeds.filter(b => b.ward === wardName);
    if (wardBeds.length === 0) return; // Skip empty groups under current filter

    const totalWardBeds = appState.beds.filter(b => b.ward === wardName).length;
    const availCount = wardBeds.filter(b => b.status === "available").length;
    const occCount = wardBeds.filter(b => b.status === "occupied").length;
    const resCount = wardBeds.filter(b => b.status === "reserved").length;

    let wardIcon = "bi-hospital";
    if (wardName === "ICU") wardIcon = "bi-heart-pulse-fill text-danger";
    else if (wardName === "Emergency Ward") wardIcon = "bi-lightning-charge-fill text-warning";
    else if (wardName === "Private Rooms") wardIcon = "bi-shield-check text-info";
    else wardIcon = "bi-building text-primary";

    finalHtml += `
      <div class="ward-section mb-4">
        <div class="ward-section-title">
          <div class="ward-section-name">
            <i class="${wardIcon}"></i>
            <span>${wardName}</span>
          </div>
          <div class="ward-section-stats">
            <span class="text-success"><i class="bi-check-circle"></i> ${availCount} Available</span> &bull; 
            <span class="text-danger"><i class="bi-person"></i> ${occCount} Occupied</span> &bull; 
            <span class="text-warning"><i class="bi-clock"></i> ${resCount} Reserved</span>
          </div>
        </div>

        <div class="row g-3">
          ${wardBeds.map(bed => createBedCardHtml(bed)).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = finalHtml;
}

/**
 * Generates modern card HTML for an individual bed.
 */
function createBedCardHtml(bed) {
  const patient = bed.patientId ? appState.patients.find(p => p.id === bed.patientId) : null;

  let statusClass = `status-${bed.status}`;
  let pillClass = `pill-${bed.status}`;
  let statusText = bed.status.charAt(0).toUpperCase() + bed.status.slice(1);

  let iconName = "bi-hospital";
  if (bed.ward === "ICU") iconName = "bi-heart-pulse";
  else if (bed.ward === "Emergency Ward") iconName = "bi-lightning-charge";
  else if (bed.ward === "Private Rooms") iconName = "bi-door-closed";

  // Middle Content based on status
  let middleContent = "";
  if (bed.status === "occupied" && patient) {
    middleContent = `
      <div class="bed-info-box">
        <div class="patient-preview-name">
          <i class="bi-person-circle text-danger"></i>
          <span>${escapeHtml(patient.name)}</span>
        </div>
        <div class="patient-preview-detail">
          <span>Patient ID:</span>
          <strong class="font-monospace">${escapeHtml(patient.id)}</strong>
        </div>
        <div class="patient-preview-detail">
          <span>Age & Gender:</span>
          <span>${patient.age} yrs &bull; ${escapeHtml(patient.gender)}</span>
        </div>
        <div class="patient-preview-detail">
          <span>Admitted:</span>
          <span>${formatDateShort(patient.admissionDate)}</span>
        </div>
      </div>
    `;
  } else if (bed.status === "reserved") {
    middleContent = `
      <div class="bed-info-box">
        <div class="reserved-prompt">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi-clock-history text-warning"></i>
            <span class="reserved-note">Hold Placed</span>
          </div>
          <div class="small fw-semibold text-dark">${escapeHtml(bed.reservedInfo ? bed.reservedInfo.name : "Incoming Patient")}</div>
          <div class="small text-muted text-truncate">${escapeHtml(bed.reservedInfo ? bed.reservedInfo.reason : "Scheduled clinical transfer")}</div>
        </div>
      </div>
    `;
  } else {
    // Available
    middleContent = `
      <div class="bed-info-box">
        <div class="available-prompt">
          <i class="bi-check2-circle"></i>
          <span class="fw-bold">Ready for Patient</span>
          <small class="text-muted">Sanitized: ${escapeHtml(bed.lastSanitized)}</small>
        </div>
      </div>
    `;
  }

  // Footer Actions
  let footerButtons = "";
  if (bed.status === "available") {
    footerButtons = `
      <button class="btn btn-primary-hospital btn-sm flex-grow-1" onclick="openAssignModal('${bed.id}')">
        <i class="bi-person-plus-fill me-1"></i> Assign Bed
      </button>
      <button class="btn btn-outline-hospital btn-sm" onclick="quickReserveBed('${bed.id}')" title="Reserve for incoming patient">
        <i class="bi-clock-history"></i> Reserve
      </button>
    `;
  } else if (bed.status === "occupied") {
    footerButtons = `
      <button class="btn btn-outline-hospital btn-sm flex-grow-1" onclick="viewBedDetails('${bed.id}')">
        <i class="bi-eye me-1"></i> View Details
      </button>
      <button class="btn btn-danger-soft btn-sm" onclick="openDischargeModal('${patient ? patient.id : ''}')" title="Discharge patient">
        <i class="bi-box-arrow-right me-1"></i> Discharge
      </button>
    `;
  } else {
    // Reserved
    footerButtons = `
      <button class="btn btn-primary-hospital btn-sm flex-grow-1" onclick="openAssignModal('${bed.id}')">
        <i class="bi-person-check-fill me-1"></i> Admit Patient
      </button>
      <button class="btn btn-outline-secondary btn-sm" onclick="cancelReservation('${bed.id}')" title="Cancel Reservation">
        <i class="bi-x-circle"></i> Release
      </button>
    `;
  }

  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div class="bed-card ${statusClass}">
        <div class="bed-card-body">
          <div class="bed-card-header">
            <div class="bed-identity">
              <div class="bed-icon-badge">
                <i class="${iconName}"></i>
              </div>
              <div>
                <h4 class="bed-number-title">${escapeHtml(bed.number)}</h4>
                <p class="bed-type-subtitle">${escapeHtml(bed.type)}</p>
              </div>
            </div>
            <span class="status-pill ${pillClass}">
              <span class="dot"></span> ${statusText}
            </span>
          </div>

          <div class="small text-muted mb-1">
            <i class="bi-geo-alt me-1"></i> ${escapeHtml(bed.floor)}
          </div>

          ${middleContent}
        </div>

        <div class="bed-card-footer">
          ${footerButtons}
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. Patient Directory View
// ==========================================================================
function renderPatients() {
  const tbody = document.getElementById("patients-table-body");
  const countDisplay = document.getElementById("patient-table-count");
  if (!tbody) return;

  const query = appState.patientSearch.toLowerCase().trim();

  const filtered = appState.patients.filter(p => {
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.bedId.toLowerCase().includes(query) ||
      p.ward.toLowerCase().includes(query) ||
      (p.doctor && p.doctor.toLowerCase().includes(query))
    );
  });

  if (countDisplay) {
    countDisplay.textContent = `${filtered.length} Patients`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-5">
          <i class="bi-people text-muted fs-1 mb-2 d-block"></i>
          <h5 class="text-secondary fw-bold">No Patients Found</h5>
          <p class="text-muted small">No active patients match your search criteria.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(patient => {
    const formattedDate = formatDateTime(patient.admissionDate);
    return `
      <tr>
        <td>
          <span class="patient-id-badge">${escapeHtml(patient.id)}</span>
        </td>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(patient.name)}</div>
          <small class="text-muted">${escapeHtml(patient.doctor || "Attending Physician")}</small>
        </td>
        <td>
          <div>${patient.age} yrs</div>
          <small class="text-muted">${escapeHtml(patient.gender)}</small>
        </td>
        <td>
          <span class="badge bg-light text-dark border">${escapeHtml(patient.ward)}</span>
        </td>
        <td>
          <span class="bed-tag">
            <i class="bi-hospital"></i> ${escapeHtml(patient.bedId)}
          </span>
        </td>
        <td>
          <div class="small">${formattedDate}</div>
        </td>
        <td>
          <span class="small font-monospace text-secondary">${escapeHtml(patient.contact)}</span>
        </td>
        <td class="text-end">
          <div class="d-inline-flex gap-1">
            <button class="btn btn-sm btn-outline-hospital" onclick="viewBedDetails('${patient.bedId}')" title="Clinical Details">
              <i class="bi-eye me-1"></i> Details
            </button>
            <button class="btn btn-sm btn-danger-soft" onclick="openDischargeModal('${patient.id}')" title="Discharge Patient">
              <i class="bi-box-arrow-right me-1"></i> Discharge
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// ==========================================================================
// 7. Patient Bed Allocation / Assignment Flow
// ==========================================================================
let assignModalInstance = null;

function openAssignModal(preselectedBedId = null) {
  const modalEl = document.getElementById("assignBedModal");
  if (!modalEl) return;

  if (!assignModalInstance) {
    assignModalInstance = new bootstrap.Modal(modalEl);
  }

  const form = document.getElementById("assignBedForm");
  form.reset();
  form.classList.remove("was-validated");

  // Populate Bed Dropdown with all Available or Reserved beds
  const bedSelect = document.getElementById("assign-bed-select");
  bedSelect.innerHTML = `<option value="">-- Choose an Available Bed --</option>`;

  const availableOrReservedBeds = appState.beds.filter(b => b.status === "available" || b.status === "reserved" || b.id === preselectedBedId);

  availableOrReservedBeds.forEach(bed => {
    const isSelected = bed.id === preselectedBedId;
    const statusNote = bed.status === "reserved" ? " (Reserved)" : "";
    const option = document.createElement("option");
    option.value = bed.id;
    option.textContent = `${bed.number} - ${bed.ward} - ${bed.type}${statusNote}`;
    if (isSelected) option.selected = true;
    bedSelect.appendChild(option);
  });

  // Pre-fill or generate new Patient ID
  document.getElementById("patient-id").value = generateNextPatientId();

  // Pre-fill Admission Date with current local datetime
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById("patient-admission-date").value = now.toISOString().slice(0, 16);

  // Update Top Banner based on selected bed
  updateAssignModalBanner(preselectedBedId);

  // Listen to select change
  bedSelect.onchange = (e) => {
    updateAssignModalBanner(e.target.value);
  };

  assignModalInstance.show();
}

function updateAssignModalBanner(bedId) {
  const title = document.getElementById("assign-modal-bed-title");
  const desc = document.getElementById("assign-modal-bed-desc");
  const badge = document.getElementById("assign-modal-bed-status");

  if (!bedId) {
    title.textContent = "Select Bed";
    desc.textContent = "Please choose an available or reserved bed above";
    badge.textContent = "Pending";
    badge.className = "badge bg-secondary";
    return;
  }

  const bed = appState.beds.find(b => b.id === bedId);
  if (bed) {
    title.textContent = `Bed: ${bed.number} (${bed.ward})`;
    desc.textContent = `${bed.type} &bull; ${bed.floor}`;
    if (bed.status === "available") {
      badge.textContent = "Available & Sanitized";
      badge.className = "badge bg-success";
    } else if (bed.status === "reserved") {
      badge.textContent = "Reserved Hold";
      badge.className = "badge bg-warning text-dark";
    }
  }
}

function generateNextPatientId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `PT-${randomNum}`;
}

function generateNewPatientId(event) {
  if (event) event.preventDefault();
  document.getElementById("patient-id").value = generateNextPatientId();
}

function handleAssignFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("assignBedForm");

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  const selectedBedId = document.getElementById("assign-bed-select").value;
  const patientName = document.getElementById("patient-name").value.trim();
  const patientId = document.getElementById("patient-id").value.trim();
  const patientAge = parseInt(document.getElementById("patient-age").value, 10);
  const patientGender = document.getElementById("patient-gender").value;
  const patientContact = document.getElementById("patient-contact").value.trim();
  const admissionDate = document.getElementById("patient-admission-date").value;
  const doctor = document.getElementById("patient-doctor").value;
  const diagnosis = document.getElementById("patient-diagnosis").value.trim() || "Routine patient admission under clinical monitoring.";

  // Verify bed exists
  const bedIndex = appState.beds.findIndex(b => b.id === selectedBedId);
  if (bedIndex === -1) {
    alert("Please select a valid bed.");
    return;
  }

  const targetBed = appState.beds[bedIndex];

  // Prevent duplicate patient ID
  const existingPatient = appState.patients.find(p => p.id.toLowerCase() === patientId.toLowerCase());
  if (existingPatient) {
    alert(`Patient ID ${patientId} is already in use by ${existingPatient.name}. Please enter or auto-generate a unique ID.`);
    return;
  }

  // Create new patient record
  const newPatient = {
    id: patientId,
    name: patientName,
    age: patientAge,
    gender: patientGender,
    contact: patientContact,
    admissionDate: admissionDate,
    ward: targetBed.ward,
    bedId: targetBed.id,
    doctor: doctor,
    diagnosis: diagnosis
  };

  // Update Bed Status to Occupied
  targetBed.status = "occupied";
  targetBed.patientId = patientId;
  targetBed.reservedInfo = null;

  // Add to Patients
  appState.patients.unshift(newPatient);

  // Save to localStorage
  saveData();

  // Hide Modal
  if (assignModalInstance) {
    assignModalInstance.hide();
  }

  // Refresh Views
  refreshAllViews();

  // Show Success Toast
  showToast(
    "Bed Assigned Successfully",
    `Patient ${patientName} (${patientId}) has been admitted to Bed ${targetBed.number} (${targetBed.ward}).`,
    "bi-check-circle-fill",
    "text-success"
  );
}

// ==========================================================================
// 8. Bed & Patient Clinical Details Modal
// ==========================================================================
let detailsModalInstance = null;

function viewBedDetails(bedId) {
  const bed = appState.beds.find(b => b.id === bedId);
  if (!bed) return;

  const modalEl = document.getElementById("bedDetailsModal");
  if (!modalEl) return;

  if (!detailsModalInstance) {
    detailsModalInstance = new bootstrap.Modal(modalEl);
  }

  const patient = bed.patientId ? appState.patients.find(p => p.id === bed.patientId) : null;
  const body = document.getElementById("bed-details-body");
  const footer = document.getElementById("bed-details-footer");

  let statusBadge = "";
  if (bed.status === "available") {
    statusBadge = `<span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2"><i class="bi-check-circle me-1"></i> Available</span>`;
  } else if (bed.status === "occupied") {
    statusBadge = `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2"><i class="bi-person-fill-check me-1"></i> Occupied</span>`;
  } else {
    statusBadge = `<span class="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2"><i class="bi-clock-history me-1"></i> Reserved</span>`;
  }

  let equipmentBadges = (bed.equipment || []).map(eq => `<span class="badge bg-light text-secondary border me-1 mb-1">${escapeHtml(eq)}</span>`).join("");

  let contentHtml = `
    <!-- Bed Overview Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-center p-3 bg-light rounded-3 mb-4 border">
      <div>
        <h4 class="fw-bold mb-1 text-primary d-flex align-items-center gap-2">
          <i class="bi-hospital"></i> ${escapeHtml(bed.number)}
        </h4>
        <div class="text-secondary small">
          <strong>${escapeHtml(bed.ward)}</strong> &bull; ${escapeHtml(bed.type)} &bull; ${escapeHtml(bed.floor)}
        </div>
      </div>
      <div>${statusBadge}</div>
    </div>

    <!-- Bed Clinical Specifications -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6">
        <div class="p-3 border rounded-3 bg-white h-100">
          <div class="fw-bold text-secondary small text-uppercase mb-2">Sanitization & Hygiene</div>
          <div class="d-flex align-items-center gap-2 text-dark">
            <i class="bi-shield-check text-success fs-5"></i>
            <div>
              <div class="fw-semibold small">Last Sanitized Record</div>
              <small class="text-muted">${escapeHtml(bed.lastSanitized)}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="p-3 border rounded-3 bg-white h-100">
          <div class="fw-bold text-secondary small text-uppercase mb-2">Installed Equipment</div>
          <div>${equipmentBadges || '<span class="text-muted small">Standard hospital gear</span>'}</div>
        </div>
      </div>
    </div>
  `;

  // Patient Info Section if Occupied
  if (patient) {
    const admissionFormatted = formatDateTime(patient.admissionDate);
    const duration = calculateStayDuration(patient.admissionDate);

    contentHtml += `
      <div class="border rounded-3 p-3 bg-white mb-2">
        <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <h6 class="fw-bold text-dark m-0 d-flex align-items-center gap-2">
            <i class="bi-person-badge text-primary fs-5"></i> Admitted Patient Information
          </h6>
          <span class="patient-id-badge">${escapeHtml(patient.id)}</span>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-6">
            <small class="text-muted d-block">Patient Full Name</small>
            <strong class="text-dark fs-6">${escapeHtml(patient.name)}</strong>
          </div>
          <div class="col-6 col-sm-3">
            <small class="text-muted d-block">Age / Gender</small>
            <span class="text-dark fw-semibold">${patient.age} yrs &bull; ${escapeHtml(patient.gender)}</span>
          </div>
          <div class="col-6 col-sm-3">
            <small class="text-muted d-block">Contact Phone</small>
            <span class="text-dark font-monospace">${escapeHtml(patient.contact)}</span>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-6">
            <small class="text-muted d-block">Admitted Timestamp</small>
            <span class="text-dark">${admissionFormatted} (${duration})</span>
          </div>
          <div class="col-12 col-sm-6">
            <small class="text-muted d-block">Attending Physician</small>
            <strong class="text-primary">${escapeHtml(patient.doctor || "Medical Officer On-Duty")}</strong>
          </div>
        </div>

        <div>
          <small class="text-muted d-block mb-1">Clinical Diagnosis / Notes</small>
          <div class="p-2 bg-light rounded text-secondary small border">
            ${escapeHtml(patient.diagnosis || "No specific clinical notes filed.")}
          </div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-danger" onclick="closeDetailsAndDischarge('${patient.id}')">
        <i class="bi-box-arrow-right me-1"></i> Discharge Patient
      </button>
    `;
  } else if (bed.status === "reserved") {
    contentHtml += `
      <div class="border rounded-3 p-3 bg-warning-subtle text-warning-emphasis mb-2">
        <h6 class="fw-bold mb-2"><i class="bi-clock-history me-1"></i> Active Reservation Details</h6>
        <div class="mb-1"><strong>Reserved For:</strong> ${escapeHtml(bed.reservedInfo ? bed.reservedInfo.name : "Incoming Patient")}</div>
        <div class="mb-1"><strong>Reason / Procedure:</strong> ${escapeHtml(bed.reservedInfo ? bed.reservedInfo.reason : "Scheduled clinical transfer")}</div>
        <div><strong>Contact:</strong> ${escapeHtml(bed.reservedInfo ? bed.reservedInfo.contact : "N/A")}</div>
      </div>
    `;

    footer.innerHTML = `
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-outline-danger" onclick="cancelReservation('${bed.id}'); detailsModalInstance.hide();">
        <i class="bi-x-circle me-1"></i> Release Hold
      </button>
      <button type="button" class="btn btn-primary-hospital" onclick="detailsModalInstance.hide(); openAssignModal('${bed.id}');">
        <i class="bi-person-plus-fill me-1"></i> Admit to this Bed
      </button>
    `;
  } else {
    // Available
    contentHtml += `
      <div class="alert alert-success d-flex align-items-center gap-3 mb-0">
        <i class="bi-check-circle fs-3 text-success"></i>
        <div>
          <div class="fw-bold">Ready for Intake</div>
          <small>This bed is thoroughly sanitized, inspected, and ready to be allocated immediately.</small>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary-hospital" onclick="detailsModalInstance.hide(); openAssignModal('${bed.id}');">
        <i class="bi-person-plus-fill me-1"></i> Assign Patient Now
      </button>
    `;
  }

  body.innerHTML = contentHtml;
  detailsModalInstance.show();
}

function closeDetailsAndDischarge(patientId) {
  if (detailsModalInstance) {
    detailsModalInstance.hide();
  }
  setTimeout(() => {
    openDischargeModal(patientId);
  }, 350);
}

// ==========================================================================
// 9. Patient Discharge Flow
// ==========================================================================
let dischargeModalInstance = null;

function openDischargeModal(patientId) {
  const patient = appState.patients.find(p => p.id === patientId);
  if (!patient) return;

  const modalEl = document.getElementById("dischargeConfirmModal");
  if (!modalEl) return;

  if (!dischargeModalInstance) {
    dischargeModalInstance = new bootstrap.Modal(modalEl);
  }

  appState.selectedDischarge = patient;

  document.getElementById("discharge-patient-name").textContent = patient.name;
  document.getElementById("discharge-patient-id").textContent = patient.id;
  document.getElementById("discharge-patient-bed").textContent = `${patient.ward} - ${patient.bedId}`;
  document.getElementById("discharge-patient-admitted").textContent = formatDateTime(patient.admissionDate);
  document.getElementById("discharge-notes").value = "";

  dischargeModalInstance.show();
}

function handleConfirmDischarge() {
  const patient = appState.selectedDischarge;
  if (!patient) return;

  const bedId = patient.bedId;
  const patientName = patient.name;

  // 1. Remove patient from active list
  appState.patients = appState.patients.filter(p => p.id !== patient.id);

  // 2. Mark bed back to available
  const bed = appState.beds.find(b => b.id === bedId);
  if (bed) {
    bed.status = "available";
    bed.patientId = null;
    bed.reservedInfo = null;

    const now = new Date();
    bed.lastSanitized = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // 3. Save to localStorage
  saveData();

  // 4. Hide Modal
  if (dischargeModalInstance) {
    dischargeModalInstance.hide();
  }
  appState.selectedDischarge = null;

  // 5. Refresh UI
  refreshAllViews();

  // 6. Show Notification Toast
  showToast(
    "Patient Discharged",
    `Patient ${patientName} has been discharged. Bed ${bedId} is now Available and ready for housekeeping.`,
    "bi-check2-all",
    "text-success"
  );
}

// ==========================================================================
// 10. Quick Reservation Actions
// ==========================================================================
function quickReserveBed(bedId) {
  const bed = appState.beds.find(b => b.id === bedId);
  if (!bed) return;

  const holderName = prompt(`Reserve Bed ${bed.number} (${bed.ward}):\nPlease enter incoming patient or doctor name:`, "Scheduled Patient");
  if (!holderName || holderName.trim() === "") return;

  const reason = prompt("Enter reservation reason/procedure (optional):", "Scheduled Surgery / Clinical Transfer") || "Clinical Hold";

  bed.status = "reserved";
  bed.reservedInfo = {
    name: holderName.trim(),
    reason: reason.trim(),
    contact: "Contact on file"
  };

  saveData();
  refreshAllViews();

  showToast(
    "Bed Reserved",
    `Bed ${bed.number} has been reserved for ${holderName}.`,
    "bi-clock-history",
    "text-warning"
  );
}

function cancelReservation(bedId) {
  const bed = appState.beds.find(b => b.id === bedId);
  if (!bed) return;

  if (confirm(`Cancel reservation for Bed ${bed.number}? The bed will become Available immediately.`)) {
    bed.status = "available";
    bed.reservedInfo = null;

    saveData();
    refreshAllViews();

    showToast(
      "Reservation Cancelled",
      `Bed ${bed.number} is now Available.`,
      "bi-info-circle",
      "text-primary"
    );
  }
}

// ==========================================================================
// 11. Search & Filter Handlers
// ==========================================================================
function setupFilterListeners() {
  const bedSearchInput = document.getElementById("bed-search-input");
  const wardSelect = document.getElementById("filter-ward");
  const statusSelect = document.getElementById("filter-status");
  const resetBtn = document.getElementById("btn-reset-filters");

  if (bedSearchInput) {
    bedSearchInput.addEventListener("input", (e) => {
      appState.filters.search = e.target.value;
      renderBedArrangement();
    });
  }

  if (wardSelect) {
    wardSelect.addEventListener("change", (e) => {
      appState.filters.ward = e.target.value;
      renderBedArrangement();
    });
  }

  if (statusSelect) {
    statusSelect.addEventListener("change", (e) => {
      appState.filters.status = e.target.value;
      renderBedArrangement();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }

  // Patient Directory Search
  const patientSearchInput = document.getElementById("patient-search-input");
  if (patientSearchInput) {
    patientSearchInput.addEventListener("input", (e) => {
      appState.patientSearch = e.target.value;
      renderPatients();
    });
  }
}

function resetFilters() {
  appState.filters.search = "";
  appState.filters.ward = "all";
  appState.filters.status = "all";

  const bedSearchInput = document.getElementById("bed-search-input");
  const wardSelect = document.getElementById("filter-ward");
  const statusSelect = document.getElementById("filter-status");

  if (bedSearchInput) bedSearchInput.value = "";
  if (wardSelect) wardSelect.value = "all";
  if (statusSelect) statusSelect.value = "all";

  renderBedArrangement();
}

function quickFilterWard(wardName) {
  switchView("beds");
  appState.filters.ward = wardName;
  const wardSelect = document.getElementById("filter-ward");
  if (wardSelect) wardSelect.value = wardName;
  renderBedArrangement();
}

function filterBedsByStatus(statusName) {
  switchView("beds");
  appState.filters.status = statusName;
  const statusSelect = document.getElementById("filter-status");
  if (statusSelect) statusSelect.value = statusName;
  renderBedArrangement();
}

// ==========================================================================
// 12. Helper Utilities & UI Notifications
// ==========================================================================
function refreshAllViews() {
  renderDashboard();
  renderBedArrangement();
  renderPatients();
}

let toastInstance = null;
function showToast(title, message, iconClass = "bi-check-circle-fill", iconColor = "text-success") {
  const toastEl = document.getElementById("hospitalToast");
  if (!toastEl) return;

  document.getElementById("toast-title").textContent = title;
  document.getElementById("toast-message").textContent = message;

  const iconEl = document.getElementById("toast-icon");
  if (iconEl) {
    iconEl.className = `${iconClass} ${iconColor} me-2 fs-5`;
  }

  if (!toastInstance) {
    toastInstance = new bootstrap.Toast(toastEl, { delay: 4000 });
  }

  toastInstance.show();
}

function formatDateTime(isoString) {
  if (!isoString) return "-";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return isoString;
  }
}

function formatDateShort(isoString) {
  if (!isoString) return "-";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return isoString;
  }
}

function calculateStayDuration(isoString) {
  if (!isoString) return "";
  try {
    const admitted = new Date(isoString).getTime();
    const now = new Date().getTime();
    const diffHours = Math.max(0, Math.floor((now - admitted) / (1000 * 60 * 60)));
    if (diffHours < 24) {
      return `${diffHours} hr${diffHours === 1 ? '' : 's'} stay`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} stay`;
  } catch {
    return "";
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// 13. Application Entry Point
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize data from localStorage or seed
  initData();

  // 2. Setup Sidebar and mobile togglers
  setupSidebar();

  // 3. Setup Filter and Search listeners
  setupFilterListeners();

  // 4. Setup Form Submission handlers
  const assignForm = document.getElementById("assignBedForm");
  if (assignForm) {
    assignForm.addEventListener("submit", handleAssignFormSubmit);
  }

  const dischargeConfirmBtn = document.getElementById("btn-confirm-discharge");
  if (dischargeConfirmBtn) {
    dischargeConfirmBtn.addEventListener("click", handleConfirmDischarge);
  }

  // 5. Initial Render
  refreshAllViews();
});
