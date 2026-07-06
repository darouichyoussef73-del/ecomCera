"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  X,
  Plus,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Hash,
  Tag,
  CreditCard,
  Users,
  Package,
  Flame,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Inbox,
  Send,
  Archive,
  AlertCircle,
  Bookmark,
  Copy,
  Check,
  History,
  FileText,
  Loader2,
  User,
  RefreshCw,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
  .font-serif { font-family: 'Playfair Display', serif; }
  .font-sans { font-family: 'Inter', sans-serif; }
  .cera-bg { background-color: #F5F0EB; }
  .cera-text-primary { color: #3D3228; }
  .cera-text-secondary { color: #8A7E72; }
  .cera-border { border-color: #E8E0D5; }
  .cera-accent-bg { background-color: #B8916A; }
  .cera-card { background-color: rgba(255,255,255,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(232,224,213,0.6); }
  .cera-glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(232,224,213,0.5); }
  .cera-btn-primary { background-color: #3D3228; color: #F5F0EB; transition: all 0.3s ease; }
  .cera-btn-primary:hover { background-color: #B8916A; transform: translateY(-1px); box-shadow: 0 8px 25px rgba(184,145,106,0.25); }
  .cera-btn-outline { border: 1px solid #E8E0D5; color: #3D3228; background: transparent; transition: all 0.3s ease; }
  .cera-btn-outline:hover { background-color: #E8E0D5; border-color: #C4A882; }
  .cera-input { background-color: #FAF8F5; border: 1px solid #E8E0D5; color: #3D3228; transition: all 0.3s ease; }
  .cera-input:focus { outline: none; border-color: #B8916A; box-shadow: 0 0 0 3px rgba(184,145,106,0.1); background-color: #fff; }
  .cera-table-header { background-color: #F0EBE3; color: #8A7E72; }
  .cera-row:hover { background-color: rgba(232,224,213,0.3); cursor: pointer; }
  .cera-status-new { background-color: #F0EBE3; color: #B8916A; border: 1px solid #E8E0D5; }
  .cera-status-confirmed { background-color: #E8F5E9; color: #4A7C59; border: 1px solid #C8E6C9; }
  .cera-status-completed { background-color: #E3F2FD; color: #5B8DB8; border: 1px solid #BBDEFB; }
  .cera-status-cancelled { background-color: #FFEBEE; color: #C75B5B; border: 1px solid #FFCDD2; }
  .cera-status-pending { background-color: #FFF8E1; color: #B8916A; border: 1px solid #FFECB3; }
  .reveal { opacity: 0; transform: translateY(24px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal.active { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .float-anim { animation: float 8s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
  .cera-scrollbar::-webkit-scrollbar { width: 6px; }
  .cera-scrollbar::-webkit-scrollbar-track { background: #F5F0EB; }
  .cera-scrollbar::-webkit-scrollbar-thumb { background: #C4A882; border-radius: 3px; }
  .timeline-dot::before { content: ''; position: absolute; left: 15px; top: 32px; bottom: -8px; width: 2px; background: #E8E0D5; }
  .timeline-dot:last-child::before { display: none; }
`;

const Reveal = ({ children, className = "", delay = "" }) => {
  const ref = React.useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
};

const TimelineIcon = ({ icon }) => {
  const icons = {
    submit: <Inbox className="w-3.5 h-3.5" />,
    auto: <Clock className="w-3.5 h-3.5" />,
    read: <Eye className="w-3.5 h-3.5" />,
    reply: <Send className="w-3.5 h-3.5" />,
    confirm: <CheckCircle2 className="w-3.5 h-3.5" />,
    complete: <CheckCircle2 className="w-3.5 h-3.5" />,
    cancel: <XCircle className="w-3.5 h-3.5" />,
    archive: <Archive className="w-3.5 h-3.5" />,
    payment: <CreditCard className="w-3.5 h-3.5" />,
  };
  return icons[icon] || <Clock className="w-3.5 h-3.5" />;
};

const ServiceIcon = ({ type }) => {
  switch (type) {
    case "workshop":
      return <Clock className="w-4 h-4" />;
    case "commission":
      return <Package className="w-4 h-4" />;
    case "firing":
      return <Flame className="w-4 h-4" />;
    case "private":
      return <Users className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const ServiceColor = (type) => {
  switch (type) {
    case "workshop":
      return "bg-[#F0EBE3] text-[#B8916A] border-[#E8E0D5]";
    case "commission":
      return "bg-[#E8F5E9] text-[#4A7C59] border-[#C8E6C9]";
    case "firing":
      return "bg-[#FFF3E0] text-[#B8916A] border-[#FFE0B2]";
    case "private":
      return "bg-[#E3F2FD] text-[#5B8DB8] border-[#BBDEFB]";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

// Map API booking data to component format
const mapBookingToSubmission = (booking) => ({
  id: booking.id,
  bookingId: booking.booking_id || `BK-${booking.id}`,
  serviceType: booking.service_type || booking.serviceType || "workshop",
  serviceLabel:
    booking.service_label ||
    booking.service_type ||
    booking.serviceType ||
    "Booking",
  fullName: booking.full_name || booking.fullName || booking.name || "Unknown",
  email: booking.email || "",
  phone: booking.phone || "",
  date: booking.preferred_date || booking.date || "",
  time: booking.preferred_time || booking.time || "",
  participants: booking.participants || "1",
  experience: booking.experience || "",
  serviceTypeDetail:
    booking.service_type_detail || booking.serviceTypeDetail || "",
  message: booking.message || booking.notes || "",
  status: booking.status || "new",
  submittedAt:
    booking.submitted_at ||
    booking.created_at ||
    booking.submittedAt ||
    new Date().toISOString(),
  price: parseFloat(booking.price) || 0,
  location: booking.location || "",
  pieceType: booking.piece_type || booking.pieceType || "",
  dimensions: booking.dimensions || booking.dimensions || "",
  glazePreference: booking.glaze_preference || booking.glazePreference || "",
  notes: booking.notes || "",
  user_id: booking.user_id || booking.client_id || null,
});

const page = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("submittedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [detailSub, setDetailSub] = useState(null);
  const [editingSub, setEditingSub] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subToDelete, setSubToDelete] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState("overview");
  const itemsPerPage = 6;

  // Get user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
        setError("User session invalid. Please log in again.");
        setLoading(false);
      }
    } else {
      setError("Please log in to view your bookings.");
      setLoading(false);
    }
  }, []);

  // Fetch bookings from API when user is available
  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo("");

      const token = localStorage.getItem("token");
      const url = `${API_BASE_URL}/bookings`;

      console.log("Fetching bookings from:", url);
      console.log("Token present:", !!token);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        setDebugInfo(
          `URL: ${url}\nStatus: ${response.status}\nResponse: ${errorText.substring(0, 200)}`,
        );

        if (response.status === 405) {
          throw new Error(
            `405 Method Not Allowed - The server rejected the GET request. Check your Laravel routes (php artisan route:list) and clear route cache (php artisan route:clear).`,
          );
        }
        if (response.status === 401) {
          throw new Error("Session expired. Please log in again.");
        }
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText.substring(0, 100)}`,
        );
      }

      const data = await response.json();
      console.log("Bookings data:", data);

      // Handle different API response formats
      const bookingsArray = Array.isArray(data)
        ? data
        : data.data || data.bookings || [];

      // Map API data to component format and filter by user ID
      const mappedBookings = bookingsArray.map(mapBookingToSubmission);
      setSubmissions(mappedBookings);
      setDebugInfo(`Success! Loaded ${mappedBookings.length} bookings.`);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAPI = async (sub) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/bookings/${sub.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete booking: ${response.status} - ${errorText}`,
        );
      }

      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking: " + err.message);
    }
  };

  const handleUpdateStatusAPI = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }

      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
      );
      if (detailSub?.id === id)
        setDetailSub((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status: " + err.message);
    }
  };

  const handleBulkDeleteAPI = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedSubs.map((id) =>
          fetch(`${API_BASE_URL}/bookings/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }),
        ),
      );
      setSelectedSubs([]);
      fetchBookings();
    } catch (err) {
      console.error("Error bulk deleting:", err);
      alert("Failed to delete some bookings");
    }
  };

  const handleBulkStatusAPI = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedSubs.map((id) =>
          fetch(`${API_BASE_URL}/bookings/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({ status: newStatus }),
          }),
        ),
      );
      setSubmissions((prev) =>
        prev.map((s) =>
          selectedSubs.includes(s.id) ? { ...s, status: newStatus } : s,
        ),
      );
      setSelectedSubs([]);
    } catch (err) {
      console.error("Error bulk updating status:", err);
      alert("Failed to update some bookings");
    }
  };

  const handleSaveEditAPI = async () => {
    if (!editingSub) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/bookings/${editingSub.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            full_name: editingSub.fullName,
            email: editingSub.email,
            phone: editingSub.phone,
            status: editingSub.status,
            service_date: editingSub.date,
            price: editingSub.price,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }

      setSubmissions((prev) =>
        prev.map((s) => (s.id === editingSub.id ? editingSub : s)),
      );
      setEditingSub(null);
    } catch (err) {
      console.error("Error saving edit:", err);
      alert("Failed to save changes: " + err.message);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.serviceLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || s.serviceType === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === "submittedAt" || sortBy === "date") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (sortOrder === "asc") return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  const toggleSelectAll = () => {
    if (selectedSubs.length === paginated.length && paginated.length > 0)
      setSelectedSubs([]);
    else setSelectedSubs(paginated.map((s) => s.id));
  };
  const toggleSelectSub = (id) => {
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const handleDelete = (sub) => {
    setSubToDelete(sub);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (!subToDelete) return;
    handleDeleteAPI(subToDelete);
    setShowDeleteModal(false);
    setSubToDelete(null);
    if (detailSub?.id === subToDelete.id) setDetailSub(null);
  };
  const handleBulkDelete = () => {
    handleBulkDeleteAPI();
  };
  const handleBulkStatus = (newStatus) => {
    handleBulkStatusAPI(newStatus);
  };
  const updateSubStatus = (id, newStatus) => {
    handleUpdateStatusAPI(id, newStatus);
  };
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return "cera-status-new";
      case "confirmed":
        return "cera-status-confirmed";
      case "completed":
        return "cera-status-completed";
      case "cancelled":
        return "cera-status-cancelled";
      case "pending":
        return "cera-status-pending";
      default:
        return "cera-status-new";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Inbox className="w-3.5 h-3.5" />;
      case "confirmed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <Inbox className="w-3.5 h-3.5" />;
    }
  };
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    return `${formatDate(dateStr)} at ${formatTime(dateStr)}`;
  };

  const stats = {
    total: submissions.length,
    workshop: submissions.filter((s) => s.serviceType === "workshop").length,
    commission: submissions.filter((s) => s.serviceType === "commission")
      .length,
    firing: submissions.filter((s) => s.serviceType === "firing").length,
    private: submissions.filter((s) => s.serviceType === "private").length,
    revenue: submissions.reduce(
      (sum, s) => sum + (parseFloat(s.price) || 0),
      0,
    ),
    pending: submissions.filter(
      (s) => s.status === "pending" || s.status === "new",
    ).length,
  };

  const generateTimeline = (sub) => {
    const tl = [
      {
        date: sub.submittedAt,
        action: "Booking submitted",
        by: sub.fullName,
        icon: "submit",
      },
    ];
    if (sub.status === "confirmed" || sub.status === "completed") {
      tl.push({
        date: sub.submittedAt,
        action: "Booking confirmed",
        by: "Admin",
        icon: "confirm",
      });
    }
    if (sub.status === "completed") {
      tl.push({
        date: sub.date + "T12:00:00",
        action: "Service completed",
        by: "System",
        icon: "complete",
      });
    }
    if (sub.status === "cancelled") {
      tl.push({
        date: sub.submittedAt,
        action: "Booking cancelled",
        by: "Admin",
        icon: "cancel",
      });
    }
    return tl;
  };

  // Not logged in state
  if (!user && !loading) {
    return (
      <div className="min-h-screen cera-bg flex items-center justify-center p-4">
        <div className="cera-card rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-[#F0EBE3] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#B8916A]" />
          </div>
          <h3 className="text-lg font-serif font-semibold cera-text-primary mb-2">
            Not Logged In
          </h3>
          <p className="text-sm cera-text-secondary">
            Please log in to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen cera-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#B8916A] animate-spin" />
          <p className="text-sm cera-text-secondary">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen cera-bg flex items-center justify-center p-4">
        <div className="cera-card rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-serif font-semibold cera-text-primary mb-2">
            Failed to load bookings
          </h3>
          <p className="text-sm cera-text-secondary mb-4">{error}</p>

          {debugInfo && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg text-left">
              <p className="text-xs font-mono text-gray-600 whitespace-pre-wrap">
                {debugInfo}
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-center">
            <button
              onClick={fetchBookings}
              className="cera-btn-primary px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>

          <div className="mt-6 text-left text-xs cera-text-secondary space-y-1">
            <p className="font-semibold">Troubleshooting steps:</p>
            <p>
              1. Run:{" "}
              <code className="bg-gray-100 px-1 rounded">
                php artisan route:clear
              </code>
            </p>
            <p>
              2. Check:{" "}
              <code className="bg-gray-100 px-1 rounded">
                php artisan route:list | grep bookings
              </code>
            </p>
            <p>3. Ensure your route uses GET method in routes/api.php</p>
          </div>
        </div>
      </div>
    );
  }

  // Detail Popup
  const DetailPopup = () => {
    if (!detailSub) return null;
    const sub = detailSub;
    const tabs = [
      {
        id: "overview",
        label: "Overview",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        id: "details",
        label: "Form Details",
        icon: <Package className="w-4 h-4" />,
      },
      {
        id: "timeline",
        label: "Timeline",
        icon: <History className="w-4 h-4" />,
      },
      { id: "notes", label: "Notes", icon: <Bookmark className="w-4 h-4" /> },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div
          className="absolute inset-0 bg-[#3D3228]/40 backdrop-blur-sm"
          onClick={() => setDetailSub(null)}
        />
        <div className="relative cera-card rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 cera-glass border-b cera-border px-5 sm:px-8 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg ${ServiceColor(sub.serviceType).split(" ")[0]} ${ServiceColor(sub.serviceType).split(" ")[1]}`}
                >
                  <ServiceIcon type={sub.serviceType} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-serif font-semibold cera-text-primary truncate">
                      {sub.serviceLabel}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(sub.status)}`}
                    >
                      {getStatusIcon(sub.status)}{" "}
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-sm cera-text-secondary">
                      {sub.bookingId}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C4A882]" />
                    <span className="text-sm cera-text-secondary">
                      {sub.fullName}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C4A882]" />
                    <span className="text-sm cera-text-secondary">
                      {formatDateTime(sub.submittedAt)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetailSub(null)}
                className="p-2 rounded-xl hover:bg-[#E8E0D5]/50 transition-all shrink-0"
              >
                <X className="w-5 h-5 cera-text-secondary" />
              </button>
            </div>
            {/* Tabs */}
            <div className="flex items-center gap-1 mt-5 overflow-x-auto cera-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeDetailTab === tab.id ? "bg-[#3D3228] text-[#F5F0EB] shadow-md" : "cera-text-secondary hover:bg-[#E8E0D5]/30"}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto cera-scrollbar p-5 sm:p-8">
            {/* OVERVIEW */}
            {activeDetailTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Booking ID",
                      value: sub.bookingId,
                      icon: <Hash className="w-4 h-4" />,
                    },
                    {
                      label: "Service",
                      value: sub.serviceLabel,
                      icon: <Tag className="w-4 h-4" />,
                    },
                    {
                      label: "Price",
                      value: `$${sub.price.toLocaleString()}`,
                      icon: <CreditCard className="w-4 h-4" />,
                      color: "text-[#B8916A]",
                    },
                    {
                      label: "Status",
                      value:
                        sub.status.charAt(0).toUpperCase() +
                        sub.status.slice(1),
                      icon: <AlertCircle className="w-4 h-4" />,
                      color:
                        sub.status === "confirmed"
                          ? "text-emerald-600"
                          : sub.status === "cancelled"
                            ? "text-red-600"
                            : sub.status === "completed"
                              ? "text-blue-600"
                              : "text-[#B8916A]",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#B8916A]">{stat.icon}</span>
                        <span className="text-xs cera-text-secondary uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p
                        className={`text-sm font-semibold cera-text-primary ${stat.color || ""}`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Full Name",
                        value: sub.fullName,
                        icon: <Users className="w-4 h-4" />,
                        copy: true,
                      },
                      {
                        label: "Email Address",
                        value: sub.email,
                        icon: <Mail className="w-4 h-4" />,
                        copy: true,
                      },
                      {
                        label: "Phone Number",
                        value: sub.phone,
                        icon: <Phone className="w-4 h-4" />,
                        copy: true,
                      },
                      {
                        label: "Location",
                        value: sub.location,
                        icon: <MapPin className="w-4 h-4" />,
                        copy: false,
                      },
                    ].map((field, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF8F5] border cera-border group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F0EBE3] flex items-center justify-center text-[#B8916A] shrink-0">
                          {field.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs cera-text-secondary uppercase tracking-wider">
                            {field.label}
                          </p>
                          <p className="text-sm font-medium cera-text-primary truncate">
                            {field.value}
                          </p>
                        </div>
                        {field.copy && (
                          <button
                            onClick={() =>
                              copyToClipboard(
                                field.value,
                                `${sub.id}-${field.label}`,
                              )
                            }
                            className="p-2 rounded-lg hover:bg-[#E8E0D5]/50 transition-all shrink-0 opacity-0 group-hover:opacity-100"
                            title="Copy"
                          >
                            {copiedField === `${sub.id}-${field.label}` ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4 cera-text-secondary" />
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-4">
                    Booking Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Service Date
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.date ? formatDate(sub.date) : "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Time Slot
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.time || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Submitted
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {formatDateTime(sub.submittedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-3">
                    Message
                  </h3>
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border cera-border">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-[#B8916A]" />
                      <span className="text-sm font-semibold cera-text-primary">
                        Customer Message
                      </span>
                    </div>
                    <p className="text-sm cera-text-secondary leading-relaxed">
                      {sub.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FORM DETAILS */}
            {activeDetailTab === "details" && (
              <div className="space-y-6">
                <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-2">
                  Service-Specific Details
                </h3>
                {sub.serviceType === "workshop" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Workshop Type
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.serviceTypeDetail || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Experience Level
                      </p>
                      <p className="text-sm font-medium cera-text-primary capitalize">
                        {sub.experience || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Participants
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.participants}{" "}
                        {parseInt(sub.participants) > 1 ? "people" : "person"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Price per Person
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        $
                        {sub.participants
                          ? Math.round(
                              sub.price / (parseInt(sub.participants) || 1),
                            )
                          : sub.price}
                      </p>
                    </div>
                  </div>
                )}
                {sub.serviceType === "commission" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                        <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                          Piece Type
                        </p>
                        <p className="text-sm font-medium cera-text-primary">
                          {sub.pieceType || "—"}
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                        <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                          Glaze Preference
                        </p>
                        <p className="text-sm font-medium cera-text-primary capitalize">
                          {sub.glazePreference || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Dimensions / Specs
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.dimensions || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Project Description
                      </p>
                      <p className="text-sm cera-text-secondary leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                )}
                {sub.serviceType === "firing" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Firing Type
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.serviceTypeDetail || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Number of Pieces
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.participants || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border col-span-2">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Piece Details
                      </p>
                      <p className="text-sm cera-text-secondary leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                )}
                {sub.serviceType === "private" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Event Type
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.pieceType || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Group Size
                      </p>
                      <p className="text-sm font-medium cera-text-primary">
                        {sub.participants === "1"
                          ? "1–4 People"
                          : sub.participants === "2"
                            ? "5–8 People"
                            : sub.participants === "3"
                              ? "9–12 People"
                              : sub.participants || "—"}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border cera-border col-span-2">
                      <p className="text-xs cera-text-secondary uppercase tracking-wider mb-1">
                        Event Details
                      </p>
                      <p className="text-sm cera-text-secondary leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TIMELINE */}
            {activeDetailTab === "timeline" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-2">
                  Booking History
                </h3>
                <div className="space-y-0">
                  {generateTimeline(sub).map((event, i) => (
                    <div key={i} className="timeline-dot relative pl-10 pb-6">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#F0EBE3] border-2 border-[#C4A882] flex items-center justify-center text-[#B8916A]">
                        <TimelineIcon icon={event.icon} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-sm font-medium cera-text-primary">
                          {event.action}
                        </p>
                        <p className="text-xs cera-text-secondary mt-0.5">
                          by <span className="font-medium">{event.by}</span> ·{" "}
                          {formatDateTime(event.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NOTES */}
            {activeDetailTab === "notes" && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border cera-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Bookmark className="w-4 h-4 text-[#B8916A]" />
                    <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider">
                      Internal Notes
                    </h3>
                  </div>
                  <p className="text-sm cera-text-secondary leading-relaxed">
                    {sub.notes || "No internal notes yet."}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border cera-border">
                  <h3 className="text-sm font-semibold cera-text-secondary uppercase tracking-wider mb-3">
                    Add Note
                  </h3>
                  <textarea
                    placeholder="Add an internal note about this booking..."
                    rows={3}
                    className="w-full p-4 cera-input rounded-xl text-sm resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button className="cera-btn-primary px-5 py-2.5 rounded-xl text-sm font-medium">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 z-10 cera-glass border-t cera-border px-5 sm:px-8 py-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs cera-text-secondary">
                Quick actions:
              </span>
              {sub.status !== "confirmed" && (
                <button
                  onClick={() => updateSubStatus(sub.id, "confirmed")}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all"
                >
                  Confirm
                </button>
              )}
              {sub.status !== "completed" && (
                <button
                  onClick={() => updateSubStatus(sub.id, "completed")}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all"
                >
                  Complete
                </button>
              )}
              {sub.status !== "cancelled" && (
                <button
                  onClick={() => updateSubStatus(sub.id, "cancelled")}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSubStatus(sub.id, "archived")}
                className="cera-btn-outline px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
              >
                <Archive className="w-4 h-4" /> Archive
              </button>
              <button
                onClick={() => {
                  handleDelete(sub);
                  setDetailSub(null);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 transition-all"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen cera-bg font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-[#C4A882] rounded-full opacity-10 top-[-10%] right-[-5%] float-anim" />
        <div
          className="absolute w-72 h-72 bg-[#D4C4B0] rounded-full opacity-10 bottom-[-10%] left-[-5%] float-anim"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <header className="relative z-10 cera-glass sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl cera-accent-bg flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold cera-text-primary">
                  My Bookings
                </h1>
                <p className="text-xs cera-text-secondary">
                  {user
                    ? `Welcome back, ${user.name || user.email || "User"}`
                    : "Manage your service bookings"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {selectedSubs.length > 0 && (
                <div className="flex items-center gap-2 mr-4">
                  <span className="text-sm cera-text-secondary">
                    {selectedSubs.length} selected
                  </span>
                  <button
                    onClick={() => handleBulkStatus("confirmed")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                  </button>
                  <button
                    onClick={() => handleBulkStatus("archived")}
                    className="cera-btn-outline px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
                  >
                    <Archive className="w-3.5 h-3.5" /> Archive
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 text-red-600 hover:bg-red-50 border border-red-200 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              )}
              <button className="cera-btn-primary px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Booking
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Bookings",
                value: stats.total,
                icon: <FileText className="w-5 h-5" />,
                color: "text-[#3D3228]",
              },
              {
                label: "Revenue",
                value: `$${stats.revenue.toLocaleString()}`,
                icon: <CreditCard className="w-5 h-5" />,
                color: "text-[#B8916A]",
              },
              {
                label: "Pending / New",
                value: stats.pending,
                icon: <Clock className="w-5 h-5" />,
                color: "text-amber-600",
              },
              {
                label: "Confirmed",
                value: submissions.filter((s) => s.status === "confirmed")
                  .length,
                icon: <CheckCircle2 className="w-5 h-5" />,
                color: "text-emerald-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="cera-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm cera-text-secondary">
                    {stat.label}
                  </span>
                  <div className={`${stat.color} opacity-60`}>{stat.icon}</div>
                </div>
                <p
                  className={`text-3xl font-serif font-semibold ${stat.color}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Service Type Cards */}
        <Reveal delay="reveal-delay-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              {
                type: "workshop",
                label: "Workshops",
                count: stats.workshop,
                icon: <Clock className="w-5 h-5" />,
                color: "bg-[#F0EBE3] text-[#B8916A] border-[#E8E0D5]",
              },
              {
                type: "commission",
                label: "Commissions",
                count: stats.commission,
                icon: <Package className="w-5 h-5" />,
                color: "bg-[#E8F5E9] text-[#4A7C59] border-[#C8E6C9]",
              },
              {
                type: "firing",
                label: "Firing Services",
                count: stats.firing,
                icon: <Flame className="w-5 h-5" />,
                color: "bg-[#FFF3E0] text-[#B8916A] border-[#FFE0B2]",
              },
              {
                type: "private",
                label: "Private Events",
                count: stats.private,
                icon: <Users className="w-5 h-5" />,
                color: "bg-[#E3F2FD] text-[#5B8DB8] border-[#BBDEFB]",
              },
            ].map((svc) => (
              <button
                key={svc.type}
                onClick={() =>
                  setServiceFilter(
                    serviceFilter === svc.type ? "all" : svc.type,
                  )
                }
                className={`p-4 rounded-2xl border transition-all text-left hover:shadow-md ${serviceFilter === svc.type ? svc.color + " ring-2 ring-offset-2 ring-[#C4A882]" : "bg-white/50 cera-border cera-text-secondary hover:bg-[#FAF8F5]"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${serviceFilter === svc.type ? "" : "cera-text-secondary"}`}
                  >
                    {svc.label}
                  </span>
                  <span
                    className={
                      serviceFilter === svc.type ? "" : "cera-text-secondary"
                    }
                  >
                    {svc.icon}
                  </span>
                </div>
                <p
                  className={`text-2xl font-serif font-semibold ${serviceFilter === svc.type ? "" : "cera-text-primary"}`}
                >
                  {svc.count}
                </p>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay="reveal-delay-2">
          <div className="cera-card rounded-2xl mb-6 overflow-hidden">
            <div className="p-5 border-b cera-border">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cera-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search by name, email, booking ID, or service..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-11 pr-4 py-3 cera-input rounded-xl text-sm"
                  />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="appearance-none pl-10 pr-10 py-3 cera-input rounded-xl text-sm cursor-pointer min-w-[140px]"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cera-text-secondary pointer-events-none" />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cera-text-secondary pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto cera-scrollbar">
              {paginated.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="cera-table-header border-b cera-border">
                      <th className="px-5 py-4 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedSubs.length === paginated.length &&
                            paginated.length > 0
                          }
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-[#C4A882] text-[#B8916A] focus:ring-[#B8916A]"
                        />
                      </th>
                      <th className="px-5 py-4 text-left">
                        <button
                          onClick={() => handleSort("bookingId")}
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cera-text-secondary hover:text-[#3D3228] transition-colors"
                        >
                          Booking ID <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      </th>
                      <th className="px-5 py-4 text-left">
                        <button
                          onClick={() => handleSort("fullName")}
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cera-text-secondary hover:text-[#3D3228] transition-colors"
                        >
                          Customer <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider cera-text-secondary hidden lg:table-cell">
                        Contact
                      </th>
                      <th className="px-5 py-4 text-left">
                        <button
                          onClick={() => handleSort("serviceLabel")}
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cera-text-secondary hover:text-[#3D3228] transition-colors"
                        >
                          Service <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider cera-text-secondary hidden md:table-cell">
                        Date
                      </th>
                      <th className="px-5 py-4 text-left">
                        <button
                          onClick={() => handleSort("status")}
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cera-text-secondary hover:text-[#3D3228] transition-colors"
                        >
                          Status <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider cera-text-secondary hidden sm:table-cell">
                        Price
                      </th>
                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider cera-text-secondary">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E0D5]/50">
                    {paginated.map((sub) => (
                      <tr
                        key={sub.id}
                        className="cera-row transition-colors"
                        onClick={() => {
                          setDetailSub(sub);
                          setActiveDetailTab("overview");
                          updateSubStatus(sub.id, "read");
                        }}
                      >
                        <td
                          className="px-5 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubs.includes(sub.id)}
                            onChange={() => toggleSelectSub(sub.id)}
                            className="w-4 h-4 rounded border-[#C4A882] text-[#B8916A] focus:ring-[#B8916A]"
                          />
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-mono font-medium cera-text-secondary">
                            {sub.bookingId}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${ServiceColor(sub.serviceType).split(" ")[0]} ${ServiceColor(sub.serviceType).split(" ")[1]}`}
                            >
                              {sub.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold cera-text-primary truncate">
                                {sub.fullName}
                              </p>
                              <p className="text-xs cera-text-secondary truncate lg:hidden">
                                {sub.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm cera-text-secondary">
                              <Mail className="w-3.5 h-3.5 text-[#C4A882] shrink-0" />
                              <span className="truncate">{sub.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm cera-text-secondary">
                              <Phone className="w-3.5 h-3.5 text-[#C4A882] shrink-0" />
                              <span>{sub.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${ServiceColor(sub.serviceType)}`}
                            >
                              <ServiceIcon type={sub.serviceType} />
                            </span>
                            <span className="text-sm font-medium cera-text-primary">
                              {sub.serviceLabel}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="text-sm cera-text-secondary">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {sub.date ? formatDate(sub.date) : "—"}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(sub.status)}`}
                          >
                            {getStatusIcon(sub.status)}{" "}
                            {sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-sm font-medium cera-text-primary">
                            ${sub.price.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div
                            className="flex items-center justify-end gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                setDetailSub(sub);
                                setActiveDetailTab("overview");
                                updateSubStatus(sub.id, "read");
                              }}
                              className="p-2 rounded-xl cera-text-secondary hover:text-[#3D3228] hover:bg-[#E8E0D5]/50 transition-all"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingSub(sub)}
                              className="p-2 rounded-xl cera-text-secondary hover:text-[#B8916A] hover:bg-[#B8916A]/10 transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(sub)}
                              className="p-2 rounded-xl cera-text-secondary hover:text-red-600 hover:bg-red-50 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4">
                  <div className="w-20 h-20 rounded-full bg-[#F0EBE3] flex items-center justify-center mb-5">
                    <Inbox className="w-10 h-10 text-[#C4A882]" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold cera-text-primary mb-2">
                    No bookings found
                  </h3>
                  <p className="text-sm cera-text-secondary mb-5">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setServiceFilter("all");
                    }}
                    className="cera-btn-outline px-5 py-2.5 rounded-xl text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t cera-border">
                <p className="text-sm cera-text-secondary hidden sm:block">
                  Showing{" "}
                  <span className="font-medium cera-text-primary">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium cera-text-primary">
                    {Math.min(currentPage * itemsPerPage, sorted.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium cera-text-primary">
                    {sorted.length}
                  </span>{" "}
                  results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl border cera-border cera-text-secondary hover:bg-[#E8E0D5]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-medium transition-all ${currentPage === page ? "bg-[#3D3228] text-[#F5F0EB] shadow-lg" : "cera-text-secondary hover:bg-[#E8E0D5]/30 border cera-border"}`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl border cera-border cera-text-secondary hover:bg-[#E8E0D5]/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Detail Popup */}
      <DetailPopup />

      {/* Edit Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#3D3228]/30 backdrop-blur-sm"
            onClick={() => setEditingSub(null)}
          />
          <div className="relative cera-card rounded-3xl shadow-2xl max-w-lg w-full">
            <div className="px-6 py-5 border-b cera-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold cera-text-primary">
                Edit Booking
              </h3>
              <button
                onClick={() => setEditingSub(null)}
                className="p-2 rounded-xl hover:bg-[#E8E0D5]/50 transition-all"
              >
                <X className="w-5 h-5 cera-text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Full Name", key: "fullName", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone", key: "phone", type: "tel" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold cera-text-secondary uppercase tracking-wider mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={editingSub[field.key]}
                    onChange={(e) =>
                      setEditingSub({
                        ...editingSub,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 cera-input rounded-xl text-sm"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold cera-text-secondary uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={editingSub.status}
                    onChange={(e) =>
                      setEditingSub({ ...editingSub, status: e.target.value })
                    }
                    className="w-full px-4 py-2.5 cera-input rounded-xl text-sm appearance-none cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold cera-text-secondary uppercase tracking-wider mb-1.5">
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={editingSub.date}
                    onChange={(e) =>
                      setEditingSub({ ...editingSub, date: e.target.value })
                    }
                    className="w-full px-4 py-2.5 cera-input rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold cera-text-secondary uppercase tracking-wider mb-1.5">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editingSub.price}
                  onChange={(e) =>
                    setEditingSub({
                      ...editingSub,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 cera-input rounded-xl text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingSub(null)}
                  className="flex-1 cera-btn-outline py-2.5 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditAPI}
                  className="flex-1 cera-btn-primary py-2.5 rounded-xl text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && subToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#3D3228]/30 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative cera-card rounded-3xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-serif font-semibold cera-text-primary">
                Delete Booking
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1.5 rounded-xl hover:bg-[#E8E0D5]/50 transition-all"
              >
                <X className="w-5 h-5 cera-text-secondary" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <p className="text-sm cera-text-secondary">
                  Are you sure you want to delete booking{" "}
                  <span className="font-semibold cera-text-primary">
                    {subToDelete.bookingId}
                  </span>{" "}
                  from{" "}
                  <span className="font-semibold cera-text-primary">
                    {subToDelete.fullName}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 text-sm font-medium cera-text-secondary bg-[#F0EBE3] rounded-xl hover:bg-[#E8E0D5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
