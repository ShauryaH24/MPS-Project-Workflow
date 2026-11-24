import {useState} from 'react';

export const groups = [
  {title:'Finding equivalent fractions', source:'Fractions checkpoint', date:'12 Oct', initials:['AR','NW','SM'], repeated:true, note:'Same error on 2 of 3 related items', error:'Changes only one part of the fraction', attempts:8},
  {title:'Decimal place value', source:'Decimals checkpoint', date:'13 Oct', initials:['LK','OB'], repeated:true, note:'Same error repeated by both students', error:'Treats longer decimals as larger', attempts:6},
  {title:'Percentages', source:'Percentages entry check', date:'14 Oct', initials:['EJ','MT'], repeated:false, note:'Only 1 related item per student — check again', error:'Not yet clear', attempts:2},
];

const gapCounts = [3, 2, 2, 4, 5, 3];
const gapTitles = [...groups.map(group => group.title), 'Comparing fractions', 'Adding unlike fractions', 'Ratios and rates'];
const allSources = 'All assessments';
const allStatuses = 'All evidence statuses';
export const evidenceLabel = (repeated: boolean) => repeated ? 'Repeated evidence' : 'Insufficient evidence';

export function ReviewGlyph({name}: {name:'down'|'right'|'back'|'filters'|'edit'|'code'}) {
  const paths = {
    down:'m6 9 6 6 6-6',
    right:'m9 6 6 6-6 6',
    back:'M20 12H4m7-7-7 7 7 7',
    filters:'M4 6h16M4 12h16M4 18h16M8 4v4m8 2v4m-6 2v4',
    edit:'m14 5 5 5M4 16 16 4a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3L8 20H4z',
    code:'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM12 12h4v4h5v5h-5m5-9h-2m-7 7v2',
  };
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]}/></svg>;
}

export function RecommendedReview({onOpen}: {onOpen:(title:string)=>void}) {
  const [showGaps, setShowGaps] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState<string|null>(null);
  const [source, setSource] = useState(allSources);
  const [status, setStatus] = useState(allStatuses);
  const visibleGroups = groups.filter(group =>
    (source === allSources || source === group.source) &&
    (status === allStatuses || status === evidenceLabel(group.repeated))
  );
  const studentCount = visibleGroups.reduce((count, group) => count + group.initials.length, 0);

  return <section className="review-entry">
    <div className="segmented" role="group" aria-label="Recommended review view">
      <button aria-pressed={showGaps} className={showGaps ? 'selected' : ''} onClick={() => setShowGaps(true)}>Class knowledge gaps</button>
      <button aria-pressed={!showGaps} className={!showGaps ? 'selected' : ''} onClick={() => setShowGaps(false)}>Suggested groups · {groups.length}</button>
    </div>
    {showGaps ? <>
      <h1>Recommended review</h1>
      <div className="review-table gap-table">
        <table>
          <thead><tr><th scope="col">Lesson station</th><th scope="col">Class</th><th scope="col">Revised students</th></tr></thead>
          <tbody>{gapTitles.map((title, index) => <tr key={title}>
            <td>{title}</td><td><span className="evidence-pill">6 cl.</span></td><td>0/{gapCounts[index]}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </> : <>
      <div className="review-heading">
        <div>
          <h1>Suggested review groups</h1>
          <p>{visibleGroups.length} suggested {visibleGroups.length === 1 ? 'group' : 'groups'} · {studentCount} of 24 students · Suggestions only. Nothing is assigned until you confirm. Labels reflect the source test.</p>
        </div>
        <button className="icon-label filter-button" aria-expanded={showFilters} aria-controls="review-filters" onClick={() => setShowFilters(!showFilters)}><ReviewGlyph name="filters"/> Filters</button>
      </div>
      <div className="filters" id="review-filters" hidden={!showFilters}>
        <label>Grade<select><option>Grade 6</option></select></label>
        <label>Source assessment<select value={source} onChange={event => setSource(event.target.value)}>
          {[allSources, ...groups.map(group => group.source)].map(value => <option key={value}>{value}</option>)}
        </select></label>
        <label>Evidence status<select value={status} onChange={event => setStatus(event.target.value)}>
          {[allStatuses, evidenceLabel(true), evidenceLabel(false)].map(value => <option key={value}>{value}</option>)}
        </select></label>
      </div>
      <div className="review-table">
        <table className="suggested-table">
          <colgroup><col className="group-column"/><col className="students-column"/><col/><col className="control-column"/><col className="control-column"/></colgroup>
          <thead><tr><th scope="col">Group</th><th scope="col">Students</th><th scope="col">Evidence</th><th scope="col" colSpan={2}><span className="sr-only">Actions</span></th></tr></thead>
          {visibleGroups.map(group => {
            const isOpen = expanded === group.title;
            const evidenceId = `group-evidence-${groups.indexOf(group)}`;
            return <tbody key={group.title}>
              <tr className={isOpen ? 'expanded' : ''}>
                <th scope="row"><strong>{group.title}</strong><small>{group.source} · {group.date}</small></th>
                <td><div className="student-group"><span className="initials">{group.initials.map(initial => <span key={initial}>{initial}</span>)}</span>{group.initials.length} students</div></td>
                <td><span className={group.repeated ? 'evidence-pill repeated' : 'evidence-pill'}>{evidenceLabel(group.repeated)}</span><small className="evidence-note">{group.note}</small></td>
                <td className="row-control"><button className="icon-button disclosure" aria-label={`${isOpen ? 'Hide' : 'Show'} evidence for ${group.title}`} aria-expanded={isOpen} aria-controls={evidenceId} onClick={() => setExpanded(isOpen ? null : group.title)}><ReviewGlyph name="down"/></button></td>
                <td className="row-control"><button className="icon-button" aria-label={`Open ${group.title}`} onClick={() => onOpen(group.title)}><ReviewGlyph name="right"/></button></td>
              </tr>
              <tr id={evidenceId} hidden={!isOpen}><td colSpan={5} className="inline-evidence-cell">
                <dl className="inline-evidence">
                  <div><dt>Shared error</dt><dd>{group.error}</dd></div>
                  <div><dt>Evidence</dt><dd>{group.attempts} attempted items · {group.initials.length} students</dd></div>
                </dl>
              </td></tr>
            </tbody>;
          })}
          {visibleGroups.length === 0 && <tbody><tr><td colSpan={5}>No groups match your filters. <button onClick={() => {setSource(allSources);setStatus(allStatuses);}}>Clear filters</button></td></tr></tbody>}
        </table>
      </div>
    </>}
  </section>;
}
