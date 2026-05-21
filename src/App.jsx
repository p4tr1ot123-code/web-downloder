import React, { useState, useEffect } from 'react';
import { 
  Search, Download, Settings, MonitorPlay, Film, Music, 
  MoreHorizontal, Play, Pause, X, CheckCircle,
  TrendingUp, History, ShieldCheck, Zap,
  Trash2, FolderOpen, Bell, User, Cpu, Globe, 
  HardDrive, SlidersHorizontal, ChevronRight, Info
} from 'lucide-react';

// Expanded Platform List Categories
const PLATFORMS = {
  video: [
    { id: 'youtube', name: 'YouTube', icon: MonitorPlay, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'vimeo', name: 'Vimeo', icon: MonitorPlay, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'dailymotion', name: 'Dailymotion', icon: MonitorPlay, color: 'text-blue-600', bg: 'bg-blue-600/10' },
    { id: 'bilibili', name: 'Bilibili', icon: MonitorPlay, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { id: 'twitch', name: 'Twitch', icon: MonitorPlay, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'streamable', name: 'Streamable', icon: MonitorPlay, color: 'text-blue-300', bg: 'bg-blue-300/10' },
    { id: 'vk', name: 'VK Video', icon: MonitorPlay, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ],
  social: [
    { id: 'tiktok', name: 'TikTok', icon: Film, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'instagram', name: 'Instagram', icon: Search, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { id: 'facebook', name: 'Facebook', icon: Search, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'twitter', name: 'X/Twitter', icon: Search, color: 'text-gray-300', bg: 'bg-gray-700' },
    { id: 'threads', name: 'Threads', icon: Search, color: 'text-gray-100', bg: 'bg-gray-800' },
    { id: 'pinterest', name: 'Pinterest', icon: Search, color: 'text-red-600', bg: 'bg-red-600/10' },
    { id: 'reddit', name: 'Reddit', icon: Search, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'snapchat', name: 'Snapchat', icon: Search, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'tumblr', name: 'Tumblr', icon: Search, color: 'text-blue-800', bg: 'bg-blue-800/10' },
    { id: 'linkedin', name: 'LinkedIn', icon: Search, color: 'text-blue-700', bg: 'bg-blue-700/10' },
    { id: '9gag', name: '9GAG', icon: Search, color: 'text-gray-900', bg: 'bg-gray-500/20' },
  ],
  shortVideo: [
    { id: 'likee', name: 'Likee', icon: Film, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'sharechat', name: 'ShareChat', icon: Film, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'snackvideo', name: 'SnackVideo', icon: Film, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 'telegram', name: 'Telegram', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ],
  audio: [
    { id: 'spotify', name: 'Spotify', icon: Music, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 'soundcloud', name: 'SoundCloud', icon: Music, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'mixcloud', name: 'Mixcloud', icon: Music, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  ],
  tools: [
    { id: 'capcut', name: 'CapCut', icon: Film, color: 'text-white', bg: 'bg-gray-800' },
    { id: 'terabox', name: 'Terabox', icon: HardDrive, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ]
};

// Flattened list for easy search/mapping
const ALL_PLATFORMS = Object.values(PLATFORMS).flat();

const MOCK_HISTORY = [
  { id: 'h1', title: 'React 19 Full Course 2026', platform: 'youtube', size: '1.2 GB', date: '2026-05-20', type: 'video/mp4', quality: '1080p' },
  { id: 'h2', title: 'Viral Dance Challenge', platform: 'tiktok', size: '24 MB', date: '2026-05-19', type: 'video/mp4', quality: '1080p' },
  { id: 'h3', title: 'Lo-Fi Chill Beats', platform: 'spotify', size: '8 MB', date: '2026-05-18', type: 'audio/mp3', quality: '320kbps' },
  { id: 'h4', title: 'Cyberpunk Edgerunners AMV', platform: 'bilibili', size: '450 MB', date: '2026-05-15', type: 'video/mp4', quality: '4K' },
  { id: 'h5', title: 'Next.js API Routes Tutorial', platform: 'youtube', size: '320 MB', date: '2026-05-10', type: 'video/mp4', quality: '720p' }
];

export default function PremiumDownloaderApp() {
  // Main State
  const [activeTab, setActiveTab] = useState('home');
  const [urlInput, setUrlInput] = useState('');
  
  // Download State
  const [downloads, setDownloads] = useState([]);
  const [history, setHistory] = useState(MOCK_HISTORY);
  
  // Analyzer State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(null); // Triggers Modal

  // 1. Analyze the URL
  const handleAnalyzeUrl = (e) => {
    e.preventDefault();
    if (!urlInput) return;
    
    setIsAnalyzing(true);
    
    // Simulate complex backend extraction process (yt-dlp wrapper simulation)
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Determine mock platform based on URL (simple logic for prototype)
      let detectedPlatform = 'youtube'; // default fallback
      if (urlInput.includes('tiktok.com')) detectedPlatform = 'tiktok';
      if (urlInput.includes('instagram.com')) detectedPlatform = 'instagram';
      if (urlInput.includes('spotify.com')) detectedPlatform = 'spotify';
      if (urlInput.includes('twitter.com') || urlInput.includes('x.com')) detectedPlatform = 'twitter';

      const pData = ALL_PLATFORMS.find(p => p.id === detectedPlatform);

      // Show the Format Selection Modal
      setAnalyzedData({
        url: urlInput,
        title: `Extracted Media from ${pData?.name || 'Unknown'}`,
        thumbnail: `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80&blend=000000&blend-mode=overlay&blend-alpha=50`, // Mock thumb
        platform: detectedPlatform,
        formats: [
          { id: 'f1', quality: '4K (2160p)', type: 'MP4', size: '850 MB', icon: MonitorPlay },
          { id: 'f2', quality: 'HD (1080p)', type: 'MP4', size: '240 MB', icon: MonitorPlay },
          { id: 'f3', quality: 'SD (720p)', type: 'MP4', size: '85 MB', icon: MonitorPlay },
          { id: 'f4', quality: 'Audio Only', type: 'MP3', size: '12 MB', icon: Music },
        ]
      });
    }, 1800);
  };

  // 2. Start Download (Triggered from Modal)
  const handleStartDownload = (format) => {
    const newDownload = {
      id: `d${Date.now()}`,
      url: analyzedData.url,
      title: analyzedData.title,
      platform: analyzedData.platform,
      quality: format.quality,
      status: 'downloading',
      progress: 0,
      speed: 'Connecting to peers...',
      size: format.size,
      type: format.type === 'MP3' ? 'audio/mp3' : 'video/mp4'
    };
    
    setDownloads(prev => [newDownload, ...prev]);
    setAnalyzedData(null); // Close modal
    setUrlInput('');
    setActiveTab('downloads');
  };

  // 3. Multi-thread Background Progress Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads(currentDownloads => {
        let activeCount = 0;
        
        return currentDownloads.map(dl => {
          if (dl.status === 'downloading') {
            activeCount++;
            // Simulate multi-threaded dynamic speeds (IDM style)
            const speedBase = Math.random() * 15 + 5; // 5 to 20 MB/s
            const progressBump = (speedBase / 100) * (Math.random() * 2 + 1); 
            
            const newProgress = Math.min(dl.progress + progressBump, 100);
            
            if (newProgress === 100) {
              // Move to history upon completion
              setHistory(prev => [{
                id: dl.id,
                title: dl.title,
                platform: dl.platform,
                size: dl.size,
                date: new Date().toISOString().split('T')[0],
                type: dl.type,
                quality: dl.quality
              }, ...prev]);
              
              return { ...dl, status: 'completed', progress: 100, speed: '0 B/s' };
            }
            return { 
              ...dl, 
              progress: newProgress,
              speed: `${speedBase.toFixed(1)} MB/s` // Display simulated speed
            };
          }
          return dl;
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const actionDownload = (id, action) => {
    if (action === 'remove') {
      setDownloads(prev => prev.filter(d => d.id !== id));
    } else if (action === 'pause') {
      setDownloads(prev => prev.map(d => d.id === id ? {...d, status: 'paused', speed: 'Paused'} : d));
    } else if (action === 'resume') {
      setDownloads(prev => prev.map(d => d.id === id ? {...d, status: 'downloading', speed: 'Resuming...'} : d));
    }
  };

  const Sidebar = () => (
    <div className="w-72 bg-gray-950 border-r border-gray-800 flex flex-col h-full hidden md:flex">
      <div className="p-6">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
          <Zap className="w-7 h-7 text-purple-400 fill-purple-400/20" />
          OmniEngine
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">Ultimate Downloader</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-bold text-gray-500 mb-3 mt-4 px-2 uppercase tracking-wider">Main Menu</div>
        {[
          { id: 'home', icon: Globe, label: 'Discover & Analyze' },
          { id: 'downloads', icon: Download, label: 'Active Tasks', badge: downloads.filter(d=>d.status === 'downloading').length },
          { id: 'history', icon: History, label: 'Library & History' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 text-purple-400 shadow-[inset_2px_0_0_#a855f7]' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge > 0 && (
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="text-xs font-bold text-gray-500 mb-3 mt-8 px-2 uppercase tracking-wider">System</div>
        {[
          { id: 'settings', icon: Settings, label: 'Preferences' },
        ].map(item => (
           <button
           key={item.id}
           onClick={() => setActiveTab(item.id)}
           className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
             activeTab === item.id 
               ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 text-purple-400 shadow-[inset_2px_0_0_#a855f7]' 
               : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
           }`}
         >
           <div className="flex items-center gap-3">
             <item.icon className="w-5 h-5" />
             <span className="font-medium text-sm">{item.label}</span>
           </div>
         </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800/50">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700/50 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-all"></div>
          <div className="flex items-start gap-3 relative z-10">
            <ShieldCheck className="w-8 h-8 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                PRO License Active
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                64-thread engine enabled.<br/>Unlimited bandwidth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FormatModal = () => {
    if (!analyzedData) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAnalyzedData(null)}></div>
        
        <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          {/* Modal Header/Hero */}
          <div className="relative h-32 bg-gray-800 border-b border-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <img src={analyzedData.thumbnail} alt="thumbnail" className="w-full h-full object-cover opacity-50" />
            <button onClick={() => setAnalyzedData(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md">
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 pr-4">
              <div className={`p-2 rounded-lg ${ALL_PLATFORMS.find(p=>p.id === analyzedData.platform)?.bg} backdrop-blur-md`}>
                {React.createElement(ALL_PLATFORMS.find(p=>p.id === analyzedData.platform)?.icon || Globe, {
                   className: `w-5 h-5 ${ALL_PLATFORMS.find(p=>p.id === analyzedData.platform)?.color}`
                })}
              </div>
              <h3 className="text-white font-bold truncate text-lg" title={analyzedData.title}>{analyzedData.title}</h3>
            </div>
          </div>

          {/* Format List */}
          <div className="p-6 bg-gray-900">
            <p className="text-sm text-gray-400 mb-4 font-medium flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Select download quality
            </p>
            <div className="space-y-3">
              {analyzedData.formats.map(format => (
                <button
                  key={format.id}
                  onClick={() => handleStartDownload(format)}
                  className="w-full flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-purple-500/50 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                      <format.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">{format.quality}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{format.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-gray-400">{format.size}</span>
                    <Download className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Hero Search Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 md:p-12 border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-800 border border-gray-700 text-xs font-bold tracking-widest text-cyan-400 mb-6 uppercase">
            Engine V4.2 Online
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Universal Media <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Extractor</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Paste any link from 30+ supported platforms. Our multi-threaded engine bypasses restrictions to deliver maximum download speeds.
          </p>
          
          <form onSubmit={handleAnalyzeUrl} className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste URL here (e.g., https://youtube.com/watch?v=...)"
              className="w-full bg-gray-950/80 backdrop-blur-md border border-gray-700 text-white rounded-2xl py-5 pl-14 pr-36 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-lg shadow-inner placeholder:text-gray-600"
              required
            />
            <button
              type="submit"
              disabled={isAnalyzing}
              className="absolute inset-y-2 right-2 bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 rounded-xl transition-all shadow-lg hover:shadow-white/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Parsing...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Supported Platforms Grid */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 px-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Video Platforms
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {PLATFORMS.video.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4 px-2">
            <Globe className="w-5 h-5 text-purple-400" />
            Social & Short Form
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {PLATFORMS.social.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PlatformCard = ({ platform }) => (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-gray-800/80 group">
      <div className={`p-3 rounded-full ${platform.bg} group-hover:scale-110 transition-transform duration-300`}>
        <platform.icon className={`w-6 h-6 ${platform.color}`} />
      </div>
      <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-200 text-center truncate w-full">{platform.name}</span>
    </div>
  );

  const DownloadsView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 bg-gray-900 p-6 rounded-3xl border border-gray-800">
        <div>
          <h2 className="text-2xl font-black text-white">Active Queue</h2>
          <p className="text-sm text-gray-400 mt-1">Multi-thread acceleration active.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors border border-gray-700">Pause All</button>
          <button onClick={() => setDownloads(prev => prev.filter(d=>d.status !== 'completed'))} className="px-5 py-2.5 bg-red-500/10 text-red-400 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20">Clear Finished</button>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 pb-32 custom-scrollbar">
        {downloads.length === 0 ? (
          <div className="text-center py-32 text-gray-500 border-2 border-dashed border-gray-800 rounded-3xl bg-gray-900/50">
            <Download className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-bold">No active downloads</p>
            <p className="text-sm mt-2">Go to 'Discover' to analyze a URL.</p>
          </div>
        ) : (
          downloads.map(dl => (
            <div key={dl.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all relative overflow-hidden group shadow-lg">
              {/* Animated Progress Background */}
              {dl.status === 'downloading' && (
                 <div 
                   className="absolute top-0 left-0 h-full bg-purple-500/5 transition-all duration-1000 ease-linear pointer-events-none"
                   style={{ width: `${dl.progress}%` }}
                 ></div>
              )}
               {/* Top Line Progress Bar */}
               {dl.status === 'downloading' && (
                 <div 
                   className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                   style={{ width: `${dl.progress}%` }}
                 ></div>
              )}

              <div className="flex items-center gap-5 relative z-10">
                {/* Platform Icon */}
                <div className={`p-4 rounded-2xl ${ALL_PLATFORMS.find(p=>p.id === dl.platform)?.bg || 'bg-gray-800'} backdrop-blur-md`}>
                   {React.createElement(ALL_PLATFORMS.find(p=>p.id === dl.platform)?.icon || Globe, {
                     className: `w-7 h-7 ${ALL_PLATFORMS.find(p=>p.id === dl.platform)?.color || 'text-gray-400'}`
                   })}
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-white font-bold text-lg truncate" title={dl.title}>{dl.title}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider border border-gray-700">{dl.quality}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm font-medium">
                    <span className={`flex items-center gap-1.5 ${dl.status === 'completed' ? 'text-green-400' : dl.status === 'paused' ? 'text-yellow-500' : 'text-cyan-400'}`}>
                      {dl.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : 
                       dl.status === 'paused' ? <Pause className="w-4 h-4" /> :
                       <Zap className="w-4 h-4" />}
                      {dl.status === 'completed' ? 'Completed' : dl.speed}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1.5"><HardDrive className="w-4 h-4"/> {dl.size}</span>
                    <span className="text-gray-500 uppercase">{dl.type.split('/')[1]}</span>
                  </div>
                </div>

                {/* Actions & Metrics */}
                <div className="flex items-center gap-4">
                  {dl.status === 'downloading' && (
                    <div className="text-right mr-4">
                      <span className="block text-2xl font-black text-white">
                        {Math.floor(dl.progress)}<span className="text-sm text-gray-500">%</span>
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Progress</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {dl.status === 'downloading' ? (
                      <button onClick={() => actionDownload(dl.id, 'pause')} className="p-3 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700">
                        <Pause className="w-5 h-5" />
                      </button>
                    ) : dl.status === 'paused' ? (
                       <button onClick={() => actionDownload(dl.id, 'resume')} className="p-3 text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-lg shadow-purple-500/20 border border-purple-500">
                        <Play className="w-5 h-5 fill-current" />
                      </button>
                    ) : (
                       <button className="p-3 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700" title="Open Folder">
                        <FolderOpen className="w-5 h-5" />
                      </button>
                    )}
                    <button onClick={() => actionDownload(dl.id, 'remove')} className="p-3 text-gray-500 hover:text-red-400 bg-gray-800 hover:bg-red-500/10 rounded-xl transition-colors border border-gray-700 hover:border-red-500/30">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const HistoryView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 bg-gray-900 p-6 rounded-3xl border border-gray-800">
        <div>
          <h2 className="text-2xl font-black text-white">Library History</h2>
          <p className="text-sm text-gray-400 mt-1">Your downloaded media collection.</p>
        </div>
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search library..." className="bg-gray-950 border border-gray-700 text-sm rounded-xl pl-9 pr-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors w-64" />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-[11px] font-bold">
            <tr>
              <th className="px-6 py-4 rounded-tl-3xl">File Name</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Size & Quality</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right rounded-tr-3xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-800/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-white max-w-[250px] truncate">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                       {item.type.includes('video') ? <Film className="w-4 h-4"/> : <Music className="w-4 h-4"/>}
                    </div>
                    <span className="truncate block" title={item.title}>{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold capitalize border ${ALL_PLATFORMS.find(p=>p.id === item.platform)?.bg} border-current/20 ${ALL_PLATFORMS.find(p=>p.id === item.platform)?.color}`}>
                    {React.createElement(ALL_PLATFORMS.find(p=>p.id === item.platform)?.icon || Globe, {className: "w-3 h-3"})}
                    {item.platform}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  <div className="flex flex-col">
                    <span>{item.size}</span>
                    <span className="text-xs text-gray-500 font-mono">{item.quality} • {item.type.split('/')[1].toUpperCase()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">{item.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Play Media">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Open Location">
                      <FolderOpen className="w-4 h-4" />
                    </button>
                    <button onClick={() => setHistory(prev => prev.filter(h => h.id !== item.id))} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete record">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white">Preferences</h2>
        <p className="text-gray-400 mt-2">Configure engine behavior and application settings.</p>
      </div>

      <div className="space-y-6">
        {/* Section 1 */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2"><HardDrive className="w-5 h-5 text-purple-400"/> General & Storage</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Default Download Path</p>
                <p className="text-sm text-gray-400">Where all fetched media will be saved.</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value="C:\Users\Admin\Downloads\OmniMedia" className="bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-300 w-64 focus:outline-none" />
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm font-bold border border-gray-700 transition-colors">Browse</button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Auto-Convert Audio</p>
                <p className="text-sm text-gray-400">Automatically convert audio formats to MP3 (320kbps).</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 border-b border-gray-800 pb-4 flex items-center gap-2"><Cpu className="w-5 h-5 text-cyan-400"/> Engine Performance</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="max-w-md">
                <p className="font-bold text-white">Max Concurrent Downloads</p>
                <p className="text-sm text-gray-400">Number of files downloading simultaneously. Higher numbers use more bandwidth.</p>
              </div>
              <select defaultValue="3 (Balanced)" className="bg-gray-950 border border-gray-700 text-white text-sm rounded-xl block p-2.5 focus:border-purple-500 focus:ring-0">
                <option>1 (Safest)</option>
                <option>3 (Balanced)</option>
                <option>5 (Fast)</option>
                <option>10 (Extreme)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="max-w-md">
                <p className="font-bold text-white">Thread Connections per File</p>
                <p className="text-sm text-gray-400">Splits a single file into multiple parts for IDM-like speed acceleration.</p>
              </div>
              <select defaultValue="32 Threads (Pro)" className="bg-gray-950 border border-gray-700 text-white text-sm rounded-xl block p-2.5 focus:border-purple-500 focus:ring-0">
                <option>8 Threads</option>
                <option>16 Threads</option>
                <option>32 Threads (Pro)</option>
                <option>64 Threads (Pro)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-purple-500/30 flex overflow-hidden">
      <Sidebar />
      
      {/* Modals */}
      <FormatModal />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen relative">
        {/* Subtle global background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Header Row (Desktop/Tablet) */}
        <header className="h-20 bg-transparent flex items-center justify-end px-8 gap-4 z-10 shrink-0">
          <button className="p-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-full text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
          </button>
          <div className="h-10 px-4 bg-gray-900 border border-gray-800 rounded-full flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
             <a href="https://saweria.co/D404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hidden sm:block hover:text-purple-400 transition">
                Admin User</a>
            </div>
        </header>

        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden bg-gray-950 border-b border-gray-800 p-4 flex items-center justify-between z-10 shrink-0">
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400 fill-purple-400/20" />
            OmniEngine
          </h1>
          <button className="p-2 bg-gray-900 border border-gray-800 rounded-xl">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
        </header>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 relative z-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto h-full pt-4">
            {activeTab === 'home' && <DashboardView />}
            {activeTab === 'downloads' && <DownloadsView />}
            {activeTab === 'history' && <HistoryView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <nav className="md:hidden bg-gray-950 border-t border-gray-800 p-3 flex justify-around z-20 pb-safe shrink-0">
           {[
            { id: 'home', icon: Globe, label: 'Discover' },
            { id: 'downloads', icon: Download, label: 'Tasks' },
            { id: 'history', icon: History, label: 'Library' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                activeTab === item.id ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <div className="relative">
                <item.icon className="w-6 h-6 mb-1" />
                {item.id === 'downloads' && downloads.filter(d=>d.status === 'downloading').length > 0 && (
                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 border-2 border-gray-950 rounded-full"></span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>

      {/* Global Styles injected for custom scrollbar to enhance premium feel */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 20px;
          border: 2px solid #030712; /* Matches bg-gray-950 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
      `}} />
    </div>
  );
}