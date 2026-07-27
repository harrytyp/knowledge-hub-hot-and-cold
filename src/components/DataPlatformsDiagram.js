import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import '@site/src/css/platforms-diagram.css';

// ─── TOOLTIP DATA ───
const TOOLTIPS = {
  'Local Storage': { title: 'Backup', body: 'You are responsible for a backup.' },
  'Cloud Storage': { title: 'Personal Cloud Storage', body: 'Storage linked to your personal TUM login and accessible via \\\\nas.ads.mwn.de\\<TUM-ID>, mountable through file browsers or via Webdisk (VPN required outside MWN).\n\n📂 < 400 GB / Person\n🔒 Backup and Snapshots' },
  'Shared Access': { title: 'Institutional Cloud Storage', body: 'Accessible within MWN.\n\n📂 < 100 TB* / Institution\n🔒 Backup and Snapshots' },
  'Sync & Share': { title: 'Sync & Share', body: 'Joint and simultaneous editing of documents, data sharing.\n\n📂 < 50 GB*\n🔒 Versioning (up to 5 versions)' },
  'MS OneDrive': { title: 'MS OneDrive', body: 'Joint and simultaneous editing of documents, sharing and storing data.\n\n📂 < 250 GB\n🔑 Versioning and optional M365 Backup' },
  'MS SharePoint': { title: 'MS SharePoint', body: 'Store, manage, and co-edit team and organizational content in shared locations.\n\n📂 < 100 GB*\n🔑 Versioning and optional M365 Backup' },
  'MS Teams': { title: 'MS Teams', body: 'Chat, meet, and collaborate in one workspace, with files powered by OneDrive and SharePoint.\n\n📂 < 100 GB*\n🔑 Versioning and optional M365 Backup' },
  'TUM DataTagger': { title: 'TUM DataTagger', body: 'Annotating with metadata, versioning and change tracking.\n\n📂 < 50GB / User\n🔒 Backup and Versioning' },
  'TUM eLabFTW': { title: 'TUM eLabFTW', body: 'Electronic lab notebook, lab management & booking system.\n\n📂 < 10GB/Team, 📂 < 50MB/File\n🔒 Backup and Versioning' },
  'LRZ GitLab': { title: 'LRZ GitLab', body: 'Collaborative development, versioning, and management of code and software projects.\n\n🔒 Backup and Versioning\n📂 < 10 GB' },
  'Data Science Storage (DSS)': { title: 'Data Science Storage (DSS)', body: 'Storing and sharing large amounts of data.\n\n📂 > 1 TB\n🔑 Optional Backup can be activated' },
  'GigaMove': { title: 'GigaMove', body: 'Sharing large files with externals.\n\n📂 < 1TB / User\n📂 < 100 GB / File\n🔑 No backup, versioning or snapshots' },
  'DataTagger + DSS': { title: 'TUM DataTagger & DSS', body: 'A Data Science Storage can be mounted to TUM DataTagger to increase storage.' },
  'Repository': { title: 'Repository', body: 'Suitable repository for publishing your research data.' },
  'Publikation': { title: 'Publication', body: 'Details about publication planning and options.' },
  'Kriterienkatalog': { title: 'Criteria Catalog', body: 'Criteria for evaluating preservation duration and measures.' },
  'Archival': { title: 'Archival', body: 'Archiving in a suitable archive.' },
  'ISAR Cloud Storage': { title: 'ISAR Cloud Storage', body: 'Cloud storage solution for research data at LRZ.' },
  'Data Science Archive': { title: 'Data Science Archive', body: 'Long-term data science archive solution.' },
  'Bit Stream Preservation': { title: 'Bit Stream Preservation', body: 'Bit-stream preservation approach for long-term data integrity.' },
  'Additional measures': { title: 'Additional Measures', body: 'Further preservation measures if standard approaches are insufficient.' },
  'Long-term preservation': { title: 'Long-term Preservation', body: 'Strategies for preserving research data beyond the active phase.' },
  'Disciplinary': { title: 'Disciplinary Repository', body: "Subject-specific repository for your research field." },
  'Institutional': { title: 'Institutional Repository', body: "Your institution's repository for research data." },
  'Generic': { title: 'Generic Repository', body: 'Multi-disciplinary repository suitable for various data types.' },
};

// ─── HELPERS ───
function InfoIcon({ x, y, tooltip, direction }) {
  const data = TOOLTIPS[tooltip];
  if (!data) return null;
  return (
    <div className="tooltip-container" style={{ position: 'absolute', left: x, top: y }}>
      <div className="tooltip-trigger">
        <div className="info-icon">?</div>
        <div className={`tooltip-content tooltip-${direction || 'bottom'}`}>
          <div className="tooltip-subhead">{data.title}</div>
          <div className="tooltip-supporting">{data.body}</div>
          <button className="tooltip-btn">Learn more</button>
        </div>
      </div>
    </div>
  );
}

function FlowBox({ x, y, w, h, blue, center = true, children }) {
  const style = {
    left: x, top: y, width: w, height: h,
    display: 'flex', alignItems: 'center',
    justifyContent: center ? 'center' : 'flex-start',
    padding: center ? '0 8px' : '8px',
  };
  return (
    <div className={`flow-box ${blue ? 'flow-box-blue' : ''}`} style={style}>
      {children}
    </div>
  );
}

function DiamondNode({ x, y, w, h, children }) {
  return (
    <div className="diamond-node" style={{ left: x, top: y, width: w, height: h }}>
      {children}
    </div>
  );
}

// ─── HOT DATA SECTION ───
function HotDataDiagram() {
  return (
    <div className="hot-data-section">
      {/* SVG Connector overlay */}
      <svg className="connector-svg" viewBox="0 0 1000 1320">
        {/* Data Sharing (478,645.5) → Structured Documentation of (536,645.5) */}
        <line x1="478" y1="645.5" x2="536" y2="645.5" stroke="#757575" strokeWidth="4" />
        <polygon points="536,639.5 548,645.5 536,651.5" fill="#757575" />

        {/* Data Sharing center bottom (253,678) → down to Data row (394,795.5 → 394,763) */}
        <polyline points="253,678 253,795.5 394,795.5 394,763" stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points="394,757 406,763 394,769" fill="#757575" />

        {/* Structured Doc bottom center (761,678) → Processes (652,763) */}
        <polyline points="761,678 761,795.5 652,795.5 652,763" stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points="652,757 640,763 652,769" fill="#757575" />

        {/* Structured Doc bottom right (986,678) → Software (906,763) */}
        <polyline points="986,678 986,795.5 906,795.5 906,763" stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points="906,757 894,763 906,769" fill="#757575" />

        {/* Vertical connector from Data → down (394,828) */}
        <line x1="394" y1="828" x2="394" y2="894" stroke="#757575" strokeWidth="4" />
        {/* Vertical from Software → down (906,828) */}
        <line x1="906" y1="828" x2="906" y2="888" stroke="#757575" strokeWidth="4" />
      </svg>

      {/* Title */}
      <div className="diagram-title" style={{ left: 245, top: 192 }}>
        Dealing with Hot Data
      </div>

      {/* Image */}
      <img className="diagram-header-image" src={useBaseUrl('/img/hot-cold-header.png')} alt=""
        style={{ left: 793, top: 192, width: 202, height: 106 }} />

      {/* Flow Boxes */}
      <FlowBox x={28} y={613} w={450} h={65}>Data Sharing</FlowBox>
      <FlowBox x={536} y={613} w={450} h={65}>Structured Documentation of</FlowBox>
      <FlowBox x={314} y={763} w={160} h={65}>Data</FlowBox>
      <FlowBox x={572} y={763} w={160} h={65}>Processes</FlowBox>
      <FlowBox x={826} y={763} w={160} h={65}>Software</FlowBox>

      {/* Row 1: Local Storage */}
      <div className="tool-card" style={{ left: 27, top: 303 }}>
        <div className="tool-card-title">Local Storage</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>Hard Drive<br />or USB Stick</div>
        <InfoIcon x={123} y={100} tooltip="Local Storage" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 628, top: 303 }}>
        <div className="tool-card-title">Cloud Storage</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>Personal<br />Cloud Storage</div>
        <InfoIcon x={122} y={100} tooltip="Cloud Storage" direction="right" />
      </div>

      {/* Info Unten */}
      <div className="info-text" style={{ left: 260, top: 368, width: 288 }}>
        Using a central storage service for applicable data is preferred to facilitate backups, data sharing and good scientific practice.
      </div>

      {/* Hover hint */}
      <div className="hover-hint" style={{ left: 812, top: 377 }}>
        Hover over<br />to get more info.
      </div>

      {/* Row 2: Shared Access | Data Documentation | ELN | Git */}
      <div className="tool-card" style={{ left: 28, top: 711 }}>
        <div className="tool-card-title">Shared Access</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>Institutional<br />Cloud Storage</div>
        <InfoIcon x={122} y={102} tooltip="Shared Access" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 314, top: 894 }}>
        <div className="tool-card-title">Data Documentation</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>TUM DataTagger</div>
        <InfoIcon x={117} y={93} tooltip="TUM DataTagger" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 572, top: 888 }}>
        <div className="tool-card-title">Electronic Lab Notebook</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>TUM eLabFTW</div>
        <InfoIcon x={122} y={105} tooltip="TUM eLabFTW" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 826, top: 888 }}>
        <div className="tool-card-title">Git</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>LRZ GitLab</div>
        <InfoIcon x={122} y={105} tooltip="LRZ GitLab" direction="right" />
      </div>

      {/* Synchronous Edit (wider card with 4 items) */}
      <div className="tool-card" style={{ left: 27, top: 894 }}>
        <div className="tool-card-title" style={{ top: 0 }}>Synchronous Edit</div>
        <div className="tool-card-subtitle" style={{ top: 84, height: 260 }}>
          Sync & Share<br /><br />Microsoft OneDrive<br /><br />Microsoft SharePoint<br /><br />Microsoft Teams
        </div>
        <InfoIcon x={122} y={93} tooltip="Sync & Share" direction="right" />
        <InfoIcon x={122} y={146} tooltip="MS OneDrive" direction="right" />
        <InfoIcon x={122} y={209} tooltip="MS SharePoint" direction="right" />
        <InfoIcon x={122} y={268} tooltip="MS Teams" direction="right" />
      </div>

      {/* Big Data / Docs / Transfer */}
      <div className="tool-card" style={{ left: 314, top: 1093 }}>
        <div className="tool-card-title">Documentation of Big Data</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>DSS + TUM DataTagger</div>
        <InfoIcon x={117} y={102} tooltip="DataTagger + DSS" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 314, top: 1256 }}>
        <div className="tool-card-title">Big Data</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>Data Science Storage (DSS)</div>
        <InfoIcon x={126} y={100} tooltip="Data Science Storage (DSS)" direction="right" />
      </div>
      <div className="tool-card" style={{ left: 27, top: 1256 }}>
        <div className="tool-card-title">Transfer</div>
        <div className="tool-card-subtitle" style={{ top: 84 }}>RWTH GigaMove</div>
        <InfoIcon x={123} y={102} tooltip="GigaMove" direction="right" />
      </div>

      {/* Info Oben */}
      <div className="info-text" style={{ left: 660, top: 1175, width: 288 }}>
        These are the most commonly used Hot Data Tools at TUM. If they do not meet your needs, please contact the TUM Research Data Hub.
      </div>

      {/* Credits */}
      <div className="diagram-credits" style={{ left: 656, top: 1459 }}>
        Credits: @TUM Research Data Hub. CC BY 4.0 DE
      </div>
    </div>
  );
}

// ─── COLD DATA SECTION ───
function ColdDataDiagram() {
  const NY = (y) => y + 2440; // normalize y
  
  // Pre-compute y values for readability
  const y0 = NY(-2440); // title
  const y1 = NY(-2251); // Worth keeping
  const y2 = NY(-2213); // Delete
  const y3 = NY(-1912); // Publication planned
  const y4 = NY(-1874); // Publish
  const y5 = NY(-1727); // Disciplinary/Instit/Generic
  const y6 = NY(-1573); // Bit-stream
  const y7 = NY(-1535); // Archival
  const y8 = NY(-1382); // ISAR archive
  const y9 = NY(-1272); // Insufficient
  const y10 = NY(-1234); // Long-term preservation

  return (
    <div className="cold-data-section">
      {/* SVG Connectors */}
      <svg className="connector-svg" viewBox="0 0 900 1520">
        {/* Worth keeping? (34) → No → Delete (450) 
            Right edge (34+240=274, y1+118) → (320, y1+118) → (320, y2+80) → (450, y2+80) */}
        <polyline points={`274,${y1+118} 320,${y1+118} 320,${y2+80} 450,${y2+80}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points={`450,${y2+74} 438,${y2+80} 450,${y2+86}`} fill="#757575" />
        <text x="320" y={y1+108} className="connector-label" textAnchor="middle">No</text>

        {/* Worth keeping? bottom → Yes → Publication planned? top 
            Center bottom (34+120=154, y1+236) → (154, y3) */}
        <line x1="154" y1={y1+236} x2="154" y2={y3} stroke="#757575" strokeWidth="4" />
        <polygon points={`148,${y3} 160,${y3} 154,${y3+12}`} fill="#757575" />
        <text x="165" y={y1+275} className="connector-label">Yes</text>

        {/* Publication planned? right → Yes → Publish left
            Right edge (274, y3+118) → (320, y3+118) → (320, y4+80) → (734, y4+80) */}
        <polyline points={`274,${y3+118} 320,${y3+118} 320,${y4+80} 734,${y4+80}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points={`734,${y4+74} 722,${y4+80} 734,${y4+86}`} fill="#757575" />
        <text x="320" y={y3+108} className="connector-label" textAnchor="middle">Yes</text>

        {/* Publication planned? bottom → No → Delete right
            (154, y3+236) → (154, y2+160+10) → (450+160, y2+160+10) → (450+160, y2+80) */}
        <polyline points={`154,${y3+236} 154,${y2+170} 610,${y2+170} 610,${y2+80}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />

        {/* Bit-stream right → No → Archival left */}
        <polyline points={`274,${y6+118} 320,${y6+118} 320,${y7+80} 450,${y7+80}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points={`450,${y7+74} 438,${y7+80} 450,${y7+86}`} fill="#757575" />
        <text x="320" y={y6+108} className="connector-label" textAnchor="middle">No</text>

        {/* Bit-stream right → Yes → Long-term left
            Right edge (274, y6+118) → (400, y6+118) → (400, y10+80) → (234, y10+80) */}
        <polyline points={`274,${y6+118} 400,${y6+118} 400,${y10+80} 234,${y10+80}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points={`234,${y10+74} 222,${y10+80} 234,${y10+86}`} fill="#757575" />
        <text x="370" y={y6+108} className="connector-label" textAnchor="middle">Yes</text>

        {/* Long-term → right → Insufficient left
            Right edge of long-term (74+160=234, y10+80) → (550, y10+80) → (550, y9+118) → (694, y9+118) */}
        <polyline points={`234,${y10+80} 550,${y10+80} 550,${y9+118} 694,${y9+118}`} stroke="#757575" strokeWidth="4" fill="none" strokeLinejoin="round" />
        <polygon points={`694,${y9+112} 682,${y9+118} 694,${y9+124}`} fill="#757575" />

        {/* Archival → ISAR archive - right edge of archival (450+160, y7+80) → center of ISAR (610, y8+80) */}
        <line x1="610" y1={y7+80} x2="610" y2={y8+80} stroke="#757575" strokeWidth="4" />
        <polygon points={`604,${y8+80} 616,${y8+80} 610,${y8+92}`} fill="#757575" />
      </svg>

      {/* Title */}
      <div className="diagram-title" style={{ left: 235, top: y0, width: 494, height: 120 }}>
        Dealing with Cold Data
      </div>
      <img className="diagram-header-image" src={useBaseUrl('/img/hot-cold-header.png')} alt=""
        style={{ left: 793, top: NY(-2466), width: 201, height: 106 }} />

      {/* Decision Diamonds */}
      <DiamondNode x={34} y={y1} w={240} h={236}>Worth keeping or required to keep?</DiamondNode>
      <DiamondNode x={34} y={y3} w={240} h={236}>Publication planned?</DiamondNode>
      <DiamondNode x={34} y={y6} w={240} h={236}>Bit-stream preservation sufficient?</DiamondNode>
      <DiamondNode x={694} y={y9} w={240} h={236}>Insufficient preservation duration and measures?</DiamondNode>

      {/* Action Boxes */}
      <FlowBox x={450} y={y2} w={160} h={160} blue>Delete<br />discuss within the team if necessary</FlowBox>
      <FlowBox x={734} y={y4} w={160} h={160} blue>Publish<br />in a suitable repository</FlowBox>
      <FlowBox x={734} y={y5} w={160} h={192}>Disciplinary<br /><br />Institutional<br /><br />Generic</FlowBox>
      <FlowBox x={450} y={y7} w={160} h={160} blue>Archival<br />in a suitable archive</FlowBox>
      <FlowBox x={450} y={y8} w={160} h={160}>ISAR Cloud Storage<br /><br />Data Science Archive</FlowBox>
      <FlowBox x={74} y={y10} w={160} h={160} blue>Long-term preservation</FlowBox>

      {/* Info Icons */}
      <InfoIcon x={799} y={NY(-1757)} tooltip="Repository" direction="top" />
      <InfoIcon x={855} y={NY(-1705)} tooltip="Disciplinary" direction="top" />
      <InfoIcon x={855} y={NY(-1646)} tooltip="Institutional" direction="top" />
      <InfoIcon x={855} y={NY(-1590)} tooltip="Generic" direction="top" />
      <InfoIcon x={139} y={NY(-1747)} tooltip="Publikation" direction="top" />
      <InfoIcon x={139} y={NY(-2068)} tooltip="Kriterienkatalog" direction="top" />
      <InfoIcon x={515} y={NY(-1422)} tooltip="Archival" direction="top" />
      <InfoIcon x={573} y={NY(-1346)} tooltip="ISAR Cloud Storage" direction="top" />
      <InfoIcon x={573} y={NY(-1289)} tooltip="Data Science Archive" direction="top" />
      <InfoIcon x={139} y={NY(-1410)} tooltip="Bit Stream Preservation" direction="top" />
      <InfoIcon x={799} y={NY(-1096)} tooltip="Additional measures" direction="top" />
      <InfoIcon x={139} y={NY(-1121)} tooltip="Long-term preservation" direction="top" />

      {/* Hover hint */}
      <div className="hover-hint" style={{ left: 717, top: NY(-2197) }}>
        Hover over<br />to get more info.
      </div>

      {/* Credits */}
      <div className="diagram-credits" style={{ left: 574, top: NY(-1008) }}>
        Credits: @TUM Research Data Hub. CC BY 4.0 DE
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ───
export default function DataPlatformsDiagram() {
  return (
    <div className="platforms-diagram-wrapper">
      <HotDataDiagram />
      <div className="diagram-section-separator">— scroll down —</div>
      <ColdDataDiagram />
    </div>
  );
}
