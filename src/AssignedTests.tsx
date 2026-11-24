import {useState} from 'react';
import {ReviewGlyph} from './RecommendedReview';
import {materials} from './domain.mjs';

type Snapshot = {recipients: string[]; selected: string[]; start: string; due: string};
type Test = {
  id: string;
  title: string;
  group: string;
  status: string;
  score: string;
  solved: number;
  total: number;
  archived?: boolean;
  snapshot?: Snapshot;
};

const examples: Test[] = [
  {id:'fractions', title:'Comparing fractions', group:'6A', status:'Awaiting review', score:'64%', solved:4, total:4},
  {id:'decimals', title:'Decimal place value', group:'6A', status:'Awaiting review', score:'71%', solved:2, total:2},
  {id:'archive', title:'Fraction notation checkpoint', group:'6A', status:'Archived', score:'—', solved:3, total:3, archived:true},
];
const sampleProgress: Record<string, {completed: number; before: string; after: string; summary: string; assessment: string}> = {
  'Amelia Reed': {completed:3, before:'2/3 = 2/12', after:'2/3 = 8/12', assessment:'Secure on the latest review items', summary:'Correct on all three sample review items. Check later whether the understanding holds.'},
  'Noah Wilson': {completed:2, before:'2/3 = 4/8', after:'2/3 = 6/9', assessment:'Insufficient evidence', summary:'One correct independent item is insufficient to confirm understanding. Check again after the remaining material.'},
  'Sofia Martin': {completed:0, before:'2/3 = 2/12', after:'No response yet', assessment:'Needs review · no new evidence', summary:'Sofia has not opened the review in the sample. A follow-up decision needs fresh evidence.'},
};
const followUpMaterials = [
  {type:'Station', title:'Scale numerator and denominator', minutes:8},
  {type:'Practice set', title:'Equivalent fractions · 3 questions', minutes:3},
];

export function AssignedTests({snapshots, onBack}: {snapshots: Snapshot[]; onBack: () => void}) {
  const [archive, setArchive] = useState(false);
  const [group, setGroup] = useState('All groups');
  const [testType, setTestType] = useState('All tests');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Test|null>(null);
  const [sample, setSample] = useState(false);
  const [student, setStudent] = useState<string|null>(null);
  const [followUp, setFollowUp] = useState<'plan'|'draft'|null>(null);
  const [savedFollowUps, setSavedFollowUps] = useState<string[]>([]);
  const tests: Test[] = [...snapshots.map((snapshot, index): Test=>({
    id:`local-${index}`, title:'Equivalent fractions review', group:'6A', status:'Not started',
    score:'—', solved:0, total:snapshot.recipients.length, snapshot,
  })).reverse(), ...examples];
  const visible = tests.filter(test=>Boolean(test.archived)===archive &&
    (group==='All groups'||group===test.group) && (testType==='All tests'||testType===test.status) &&
    test.title.toLowerCase().includes(search.trim().toLowerCase()));
  const snapshot = active?.snapshot;
  const studentSample = student && sample ? sampleProgress[student] : undefined;
  const sampleRoster = snapshot?.recipients.filter(name=>name in sampleProgress) ?? [];
  const followUpRoster = sampleRoster.filter(name=>name==='Noah Wilson'||name==='Sofia Martin');
  const maxItems = sample ? 3 : snapshot?.selected.length ?? 0;
  const listHeading = archive?'Archive':'Assigned tests';
  const draftSaved = active && savedFollowUps.includes(active.id);

  function openTest(test: Test) {
    setActive(test);
    setSample(false);
  }

  return <section className="flow-screen assigned-tests">
    {!active&&<>
      <div className="segmented assigned-views" role="group" aria-label="Assigned tests view">
        <button aria-pressed={!archive} className={!archive?'selected':''} onClick={()=>{setArchive(false);setTestType('All tests');}}>Assigned tests</button>
        <button aria-pressed={archive} className={archive?'selected':''} onClick={()=>{setArchive(true);setTestType('All tests');}}>Archive</button>
      </div>
      <div className="row assigned-toolbar">
        <h1>{listHeading}</h1>
        <div className="actions">
          <select aria-label="Filter by group" value={group} onChange={event=>setGroup(event.target.value)}><option>All groups</option><option>6A</option></select>
          <select aria-label="Filter by test status" value={testType} onChange={event=>setTestType(event.target.value)}>
            <option>All tests</option>{(archive?['Archived']:['Not started','Awaiting review']).map(status=><option key={status}>{status}</option>)}
          </select>
          <input type="search" aria-label="Search assigned tests" placeholder="Search tests" value={search} onChange={event=>setSearch(event.target.value)}/>
        </div>
      </div>
      <div className="review-table destination-table"><table>
        <thead><tr><th scope="col">Name</th><th scope="col">Class</th><th scope="col">Status</th><th scope="col">Completion deadline</th><th scope="col">Average score</th><th scope="col">Solved the test</th><th scope="col">Actions</th></tr></thead>
        <tbody>{visible.map(test=><tr key={test.id}>
          <th scope="row">{test.title}{test.snapshot?<><small>{test.total} students · Opens {test.snapshot.start}</small><small>From Recommended review · Finding equivalent fractions</small></>:<small>Sample test</small>}</th>
          <td><span className="evidence-pill">{test.group}</span></td><td><span className="evidence-pill">{test.status}</span></td>
          <td>{test.snapshot?.due ?? 'Ended'}</td><td>{test.score}</td><td>{test.solved}/{test.total}</td>
          <td><button className={test.snapshot?'primary icon-label':'icon-label'} aria-label={`Check ${test.title}`} onClick={()=>openTest(test)}>Check <ReviewGlyph name="right"/></button></td>
        </tr>)}
        {!visible.length&&<tr><td colSpan={7}>No tests match your filters.</td></tr>}</tbody>
      </table></div>
      <footer className="flow-footer"><button onClick={onBack}>Back to group</button></footer>
    </>}
    {active&&!followUp&&<>
      <button className="textlink icon-label flow-back" onClick={()=>setActive(null)}><ReviewGlyph name="back"/> Assigned tests</button>
      {snapshot&&<p className="notice">Review assigned to {snapshot.recipients.length} {snapshot.recipients.length===1?'student':'students'} · Opens {snapshot.start}</p>}
      <div className="flow-heading"><h1>Assigned test progress</h1><span className="evidence-pill">{sample?'Sample progress':active.status}</span></div>
      <p className="subtitle">{active.title}</p>
      {snapshot?<>
        {sampleRoster.length>0&&<label className="checkline"><input type="checkbox" checked={sample} onChange={event=>setSample(event.target.checked)}/>Show catalogue sample progress</label>}
        {sample&&<p className="muted">Sample responses from the catalogue. This view leaves the submitted assignment unchanged.</p>}
        <div className="review-table destination-table"><table>
          <thead><tr><th scope="col">Student</th><th scope="col">Progress</th><th scope="col">Completion</th><th scope="col">Evidence since review</th><th scope="col">Actions</th></tr></thead>
          <tbody>{(sample?sampleRoster:snapshot.recipients).map(name=>{
            const example = sample ? sampleProgress[name] : undefined;
            const completed = example?.completed ?? 0;
            const status = completed===0?'Not started':completed===maxItems?'Completed':'In progress';
            return <tr key={name}>
              <th scope="row">{name}</th><td>{completed}/{maxItems}<progress className="test-progress" value={completed} max={Math.max(1,maxItems)} aria-label={`Progress for ${name}`}/></td>
              <td><span className={status==='Completed'?'evidence-pill repeated':'evidence-pill'}>{status}</span></td>
              <td>{example?.assessment ?? 'No new evidence'}</td>
              <td><button aria-label={`View evidence for ${name}`} onClick={()=>setStudent(name)}>View evidence</button></td>
            </tr>;
          })}</tbody>
        </table></div>
        {!sample&&<p className="muted">Assigned materials: {materials.filter(material=>snapshot.selected.includes(material.id)).map(material=>material.title).join(', ')}</p>}
      </>:<article className="flow-panel"><h2>Sample test results</h2><p>{active.solved}/{active.total} students completed the test.</p><p>Average score: {active.score}</p><p className="muted">Individual responses are unavailable for this sample test.</p></article>}
    </>}
    {student&&<dialog ref={element=>{if(element&&!element.open)element.showModal();}} className="dialog test-evidence-dialog" aria-labelledby="test-evidence-heading" onCancel={()=>setStudent(null)}>
      <h2 id="test-evidence-heading">{student} · Evidence</h2>
      {studentSample?<><p className="muted">Catalogue sample · Finding equivalent fractions</p>
        <div className="test-comparison">
          <article><h3>Before · Fractions checkpoint</h3><p>{studentSample.before}</p><span className="badge warning">Incorrect</span></article>
          <article><h3>After · Review practice</h3><p>{studentSample.after}</p><span className={studentSample.completed?'evidence-pill repeated':'evidence-pill'}>{studentSample.completed?'Correct':'Not started'}</span></article>
        </div>
        <article><h3>{studentSample.assessment}</h3><p>{studentSample.summary}</p></article>
      </>:<p>No new responses are available for this local assignment.</p>}
      <footer className="actions">
        <button onClick={()=>setStudent(null)}>Back to progress</button>
        {student==='Noah Wilson'&&studentSample&&<button className="primary" onClick={()=>{setStudent(null);setFollowUp('plan');}}>Plan follow-up</button>}
      </footer>
    </dialog>}
    {followUp&&<>
      <button className="textlink icon-label flow-back" onClick={()=>setFollowUp(followUp==='draft'?'plan':null)}><ReviewGlyph name="back"/> {followUp==='draft'?'Plan follow-up':'Equivalent fractions review'}</button>
      <div className="flow-heading"><h1>{followUp==='plan'?'Plan follow-up · Noah Wilson':'Assemble material'}</h1><span className="evidence-pill">{followUp==='plan'?'Insufficient evidence':'Follow-up draft'}</span></div>
      <p className="subtitle">Based on sample review practice · No assignments are created by this draft.</p>
      <article className="flow-panel">
        <h2>Finding equivalent fractions</h2>
        {followUp==='plan'&&<p>Checkpoint: {sampleProgress['Noah Wilson'].before} (incorrect) · Review practice: {sampleProgress['Noah Wilson'].after} (correct).</p>}
        <p><strong>{followUp==='plan'?'Suggested for teacher review':'Students'}</strong> · {followUpRoster.join(', ')}</p>
        <h2 className="panel-section">{followUp==='plan'?'Recommended materials':'Materials'} · 2 items · 11 min</h2>
        <ul className="material-list">{followUpMaterials.map(material=><li key={material.type}><small>{material.type}</small><strong>{material.title}</strong><span>{material.minutes} min</span></li>)}</ul>
      </article>
      {draftSaved&&followUp==='draft'&&<p role="status" className="notice">Follow-up draft saved for this visit.</p>}
      <footer className="flow-footer"><button onClick={()=>setFollowUp(null)}>Back to progress</button><div className="actions">
        {followUp==='plan'?<button className="primary" onClick={()=>setFollowUp('draft')}>{draftSaved?'Open follow-up draft':'Create follow-up draft'}</button>:<><button disabled={Boolean(draftSaved)} onClick={()=>{if(active)setSavedFollowUps(previous=>[...previous,active.id]);}}>Save draft</button><button className="primary" disabled>Continue</button></>}
      </div></footer>
    </>}
  </section>;
}
