import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

// ════════════════════════════════════════
// ALL TOOLTIP TEXT FROM FIGMA CANVAS.JSON
// ════════════════════════════════════════
const TOOLTIPS = {
  'local-storage':    { title: 'Backup', body: 'You are responsible for a backup.' },
  'cloud-storage':    { title: 'Personal Cloud Storage', body: 'Storage linked to your personal TUM login and accessible via \\\\nas.ads.mwn.de\\<TUM-ID>, mountable through file browsers or via Webdisk (VPN required outside MWN).\n\n📂 < 400 GB / Person\n🔒 Backup and Snapshots' },
  'shared-access':    { title: 'Institutional Cloud Storage', body: 'Accessible within MWN.\n\n📂 < 100 TB* / Institution\n🔒 Backup and Snapshots' },
  'sync-share':       { title: 'Sync & Share', body: 'Joint and simultaneous editing of documents, data sharing.\n\n📂 < 50 GB*\n🔒 Versioning (up to 5 versions)' },
  'ms-onedrive':      { title: 'MS OneDrive', body: 'Joint and simultaneous editing of documents, sharing and storing data.\n\n📂 < 250 GB\n🔑 Versioning and optional M365 Backup' },
  'ms-sharepoint':    { title: 'MS SharePoint', body: 'Store, manage, and co-edit team and organizational content in shared locations.\n\n📂 < 100 GB*\n🔑 Versioning and optional M365 Backup' },
  'ms-teams':         { title: 'MS Teams', body: 'Chat, meet, and collaborate in one workspace, with files powered by OneDrive and SharePoint.\n\n📂 < 100 GB*\n🔑 Versioning and optional M365 Backup' },
  'tum-datatagger':   { title: 'TUM DataTagger', body: 'Annotating with metadata, versioning and change tracking.\n\n📂 < 50GB / User\n🔒 Backup and Versioning' },
  'tum-elabftw':      { title: 'TUM eLabFTW', body: 'Electronic lab notebook, lab management & booking system.\n\n📂 < 10GB/Team, 📂 < 50MB/File\n🔒 Backup and Versioning' },
  'lrz-gitlab':       { title: 'LRZ GitLab', body: 'Collaborative development, versioning, and management of code and software projects.\n\n🔒 Backup and Versioning\n📂 < 10 GB' },
  'dss':              { title: 'Data Science Storage (DSS)', body: 'Storing and sharing large amounts of data.\n\n📂 > 1 TB\n🔑 Optional Backup can be activated' },
  'gigamove':         { title: 'GigaMove', body: 'Sharing large files with externals.\n\n📂 < 1TB / User\n📂 < 100 GB / File\n🔑 No backup, versioning or snapshots' },
  'datatagger-dss':   { title: 'TUM DataTagger & DSS', body: 'A Data Science Storage can be mounted to TUM DataTagger to increase storage.' },
  'repository':       { title: 'Find your repository', body: 'There are generic or discipline-specific repositories to choose from. TUM members can publish their research data in the generic institutional repository mediaTUM. Use indexes such as re3data to find discipline-specific repositories and check the preservation time, costs, metadata standards, searchability, options for access restriction if necessary or other criteria important to you.' },
  'publication':      { title: 'Please consider', body: 'Publication makes your data visible, citable and gives you credit. You can grant a license to your data, publish the data after an embargo period, allow access for certain users only, or protect your data with a password. Make sure to anonymize personal data.' },
  'kriterienkatalog': { title: 'Keep data that', body: 'is important for reuse, hard to replicate or if there are third-party requirements to do so. Use long-term formats for data you want to keep for a long time.' },
  'disciplinary':     { title: 'Discipline-specific Repositories', body: 'Whenever possible, use registries of research data repositories, such as re3data.org to find a suitable repository.' },
  'institutional':    { title: 'Institutional Repositories', body: 'When no discipline-specific repository is suitable, you can make use of the institutional repository mediaTUM free of charge.' },
  'generic':          { title: 'Generic Repositories', body: 'If suitable, you can publish your data in a general repository like Zenodo.' },
  'archival':         { title: 'Retention time', body: 'Archiving usually involves a retention period of 10 years, which is required by the DFG Guidelines on the Handling of Research Data.' },
  'isar-cloud':       { title: 'ISAR Cloud Storage', body: 'Partial MWN-ADS administrators can archive data from nas.mwn.de.\n\n⏳ Stored online in ISAR for 10 years\n🔒 Additionally backed up in the LRZ archive and backup system\n🗑️ After 10 years, files are automatically deleted from ISAR storage\n🔁 Data can still be restored for another 10 years from LRZ systems' },
  'ds-archive':       { title: 'Data Science Archive (DSA)', body: 'Hot data from the Data Science Storage (DSS) can be moved to the DSA.\n\n📂 Suitable for very large data volumes\n❄️ Data is archived in a frozen state\n🔓 Access requires thawing\n⏱️ Thawing occurs automatically via Globus Online transfers or explicitly via a CLI tool connected to the DSA service' },
  'bitstream':        { title: 'Bit-stream preservation', body: 'Bit-stream preservation ensures the physical integrity of data e.g., by monitoring check-sums.' },
  'additional-measures': { title: 'Which preservation measures are necessary?', body: 'If your data is extremely valuable in the distant future, additional measures like migration, emulation, and obsolescence monitoring might be necessary.' },
  'lt-preservation':  { title: 'Long-term preservation', body: 'Please contact the Research Data Hub for further advice if additional preservation measures such as migration, emulation, or obsolescence monitoring are necessary.' },
};

// SVG natural dimensions
const HOT_W = 1128, HOT_H = 1345;
const COLD_W = 1107, COLD_H = 1534;

// "?" circle positions as [x, y, tooltipKey, side]
// side: 'left' = tooltip appears left of icon, 'right' = appears right of icon
const HOT_NODES = [
  [224.5, 254.5, 'local-storage', 'right'],
  [824.5, 254.5, 'cloud-storage', 'left'],
  [224.5, 664.5, 'shared-access', 'right'],
  [223.5, 838.5, 'sync-share', 'right'],
  [223.5, 891.5, 'ms-onedrive', 'right'],
  [223.5, 954.5, 'ms-sharepoint', 'right'],
  [223.5, 1013.5, 'ms-teams', 'right'],
  [505.5, 838.5, 'tum-datatagger', 'left'],
  [768.5, 844.5, 'tum-elabftw', 'left'],
  [1022.5, 844.5, 'lrz-gitlab', 'left'],
  [505.5, 1046.5, 'datatagger-dss', 'left'],
  [514.5, 1207.5, 'dss', 'left'],
  [224.5, 1209.5, 'gigamove', 'right'],
];

const COLD_NODES = [
  [935.5, 322.5, 'repository', 'left'],
  [929.5, 803.5, 'disciplinary', 'left'],
  [929.5, 862.5, 'institutional', 'left'],
  [929.5, 918.5, 'generic', 'left'],
  [873.5, 751.5, 'publication', 'left'],
  [213.5, 440.5, 'kriterienkatalog', 'right'],
  [213.5, 761.5, 'publication', 'right'],
  [589.5, 1086.5, 'archival', 'left'],
  [647.5, 1162.5, 'isar-cloud', 'left'],
  [647.5, 1219.5, 'ds-archive', 'left'],
  [213.5, 1098.5, 'bitstream', 'right'],
  [873.5, 1412.5, 'additional-measures', 'left'],
  [213.5, 1387.5, 'lt-preservation', 'right'],
];

// ─── Tooltip overlay component ───
function TipOverlay({ cxPct, cyPct, tooltip, side }) {
  const [show, setShow] = React.useState(false);
  const data = TOOLTIPS[tooltip];
  if (!data) return null;

  const tipPos = side === 'left'
    ? { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }
    : { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${cxPct}%`, top: `${cyPct}%`,
        width: '2.9%', paddingBottom: '2.9%',
        transform: 'translate(-50%, -50%)',
        zIndex: 30, cursor: 'pointer',
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div style={{
          position: 'absolute', zIndex: 100,
          width: 280,
          maxWidth: 'min(280px, 80vw)',
          background: '#F3EDF7',
          borderRadius: 12,
          padding: '12px 16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.30)',
          pointerEvents: 'none',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          ...tipPos,
        }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: '#1A1A1A', marginBottom: 8, letterSpacing: '-0.01em' }}>{data.title}</div>
          <div style={{ fontWeight: 400, fontSize: 13, color: '#555', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{data.body}</div>
        </div>
      )}
    </div>
  );
}

// ─── Diagram section ───
function DiagramSection({ type, nodes, src, alt, naturalW, naturalH }) {
  const containerRef = React.useRef(null);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: naturalW,
        margin: '1.5rem auto',
        aspectRatio: `${naturalW} / ${naturalH}`,
      }}
    >
      <img
        src={useBaseUrl(src)}
        alt={alt}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {nodes.map(([x, y, key, side], i) => (
        <TipOverlay
          key={i}
          cxPct={(x + 12.5) / naturalW * 100}
          cyPct={(y + 12.5) / naturalH * 100}
          tooltip={key}
          side={side}
        />
      ))}
    </div>
  );
}

// ─── MAIN ───
export default function DataPlatformsDiagram({ section }) {
  if (section === 'hot') {
    return (
      <DiagramSection
        type="hot"
        nodes={HOT_NODES}
        src="/img/hot-data-diagram.svg"
        alt="Hot Data Platforms"
        naturalW={HOT_W}
        naturalH={HOT_H}
      />
    );
  }
  if (section === 'cold') {
    return (
      <DiagramSection
        type="cold"
        nodes={COLD_NODES}
        src="/img/cold-data-diagram.svg"
        alt="Cold Data Platforms"
        naturalW={COLD_W}
        naturalH={COLD_H}
      />
    );
  }
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', margin: '2rem 0' }}>
      <DiagramSection
        type="hot"
        nodes={HOT_NODES}
        src="/img/hot-data-diagram.svg"
        alt="Hot Data Platforms"
        naturalW={HOT_W}
        naturalH={HOT_H}
      />
      <DiagramSection
        type="cold"
        nodes={COLD_NODES}
        src="/img/cold-data-diagram.svg"
        alt="Cold Data Platforms"
        naturalW={COLD_W}
        naturalH={COLD_H}
      />
    </div>
  );
}
