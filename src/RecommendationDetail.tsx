import {Fragment, useState} from 'react';
import {groups, evidenceLabel, ReviewGlyph} from './RecommendedReview';
import {students} from './domain.mjs';

const rosters = [
  students,
  ['Leo Kim', 'Olivia Brown'],
  ['Emma Jones', 'Mateo Torres'],
];
const fractionCounts = [3, 4, 1];
const responses = [
  [
    ['Q3', 'Complete 2/3 = □/12', '2/12', '8/12'],
    ['Q5', 'Write 3/5 with numerator 6', '6/5', '6/10'],
    ['Q7', 'Choose a fraction equal to 1/2', '2/4', '2/4'],
  ],
  [['Checkpoint', 'Write a fraction equivalent to 2/3', '4/8', '6/9']],
  [['Checkpoint', 'Complete 2/3 = □/12', '2/12', '8/12']],
];
const selectableStudents = [...students, 'Liam King', 'Olivia Brown'];

export function RecommendationDetail({groupIndex, recipients, flagged, onToggleFlag, onBack, onCreate}: {
  groupIndex: number;
  recipients: string[];
  flagged: boolean;
  onToggleFlag: () => void;
  onBack: () => void;
  onCreate: (selected?: string[]) => void;
}) {
  const group = groups[groupIndex];
  const roster = rosters[groupIndex];
  const isFractions = groupIndex === 0;
  const [selection, setSelection] = useState<string[]|null>(null);
  const [editing, setEditing] = useState<string[]|null>(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string|null>(null);
  const visibleStudents = selection ?? roster;

  return <section className="flow-screen">
    <button className="textlink icon-label flow-back" onClick={onBack}><ReviewGlyph name="back"/> Suggested groups</button>
    <h1>{group.title}</h1>
    <span className={group.repeated?'evidence-pill repeated':'evidence-pill'}>{evidenceLabel(group.repeated)}</span>
    <dl className="evidence-overview">
      <div><dt>Shared error</dt><dd>{group.error}</dd></div>
      <div><dt>Source</dt><dd>{group.source} · {group.date}</dd></div>
      <div><dt>Evidence</dt><dd>{group.attempts} attempted items · {roster.length} students</dd></div>
    </dl>
    {!group.repeated&&<article className="flow-panel"><h2>Not enough evidence yet</h2><p>Add a short check for these students before creating a review.</p></article>}
    <div className="row section-title">
      <h2>Students · {visibleStudents.length}</h2>
      {isFractions&&<button className="icon-button" aria-label="Edit students" onClick={() => {setQuery('');setEditing(selection ?? recipients);}}><ReviewGlyph name="edit"/></button>}
    </div>
    <div className="review-table student-evidence"><table>
      <thead><tr><th scope="col">Student</th><th scope="col">Evidence</th><th scope="col">Last activity</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>{visibleStudents.map((name, index)=>{
        const rosterIndex = roster.indexOf(name);
        const hasEvidence = rosterIndex >= 0;
        const count = isFractions ? fractionCounts[rosterIndex] : group.repeated ? 3 : 1;
        const repeated = group.repeated && !(isFractions && rosterIndex === 2);
        const open = expanded === name;
        const evidenceId = `student-evidence-${index}`;
        return <Fragment key={name}>
          <tr>
            <th scope="row"><span className="student-group"><span className="class-avatar">{name.split(' ').map(part=>part[0]).join('')}</span><span>{name}{hasEvidence&&<small>{count} {count===1?'response':'responses'}</small>}</span></span></th>
            <td>{hasEvidence?<span className={repeated?'evidence-pill repeated':'evidence-pill'}>{evidenceLabel(repeated)}</span>:<small>No related evidence</small>}</td>
            <td>{hasEvidence?group.date:'—'}</td>
            <td>{hasEvidence&&isFractions&&<button className="icon-button disclosure" aria-expanded={open} aria-controls={evidenceId} aria-label={`${open?'Hide':'Show'} evidence for ${name}`} onClick={()=>setExpanded(open?null:name)}><ReviewGlyph name="down"/></button>}</td>
          </tr>
          {hasEvidence&&isFractions&&<tr id={evidenceId} hidden={!open}><td colSpan={4}><div className="response-panel">
            <h3>Question evidence</h3>
            <p className="muted">{group.source} · {group.date} · Sample responses</p>
            <table><thead><tr><th>Item</th><th>Question</th><th>Student answer</th><th>Correct answer</th><th>Result</th></tr></thead>
              <tbody>{responses[rosterIndex].map(([item, question, answer, expected])=><tr key={item}><td>{item}</td><td>{question}</td><td>{answer}</td><td>{expected}</td><td><span className={answer===expected?'evidence-pill repeated':'badge warning'}>{answer===expected?'Correct':'Incorrect'}</span></td></tr>)}</tbody>
            </table>
            {rosterIndex===1&&<p>The overview reports four responses. This prototype displays one documented example.</p>}
            {rosterIndex===2&&<p>Insufficient evidence · One related response. Suggested level is unset.</p>}
            {rosterIndex===0&&<p>Across Q3 and Q5, Amelia changes only one part of the fraction.</p>}
            <div className="warning callout"><strong>Evidence limitation</strong><p>These sample responses come from one checkpoint. Check the student’s reasoning with a fresh example before confirming support.</p></div>
            <p>Completing a lesson does not mean the learning is secure.</p>
            <button onClick={onToggleFlag}>{flagged?'Remove review flag':'Flag for review'}</button> <small>Action status: {flagged?'Flagged':'Not flagged'}</small>
          </div></td></tr>}
        </Fragment>;
      })}</tbody>
    </table></div>
    {groupIndex===1&&<details className="recommendation-reason"><summary>Why these students?</summary><p>Both students repeatedly treated longer decimals as larger in the Decimals checkpoint. Use a fresh item to check their reasoning.</p></details>}
    {groupIndex===1&&<p className="muted">The prototype’s review preparation workflow is available for Finding equivalent fractions.</p>}
    <footer className="flow-footer"><button className="primary" disabled={!isFractions||!visibleStudents.length} onClick={()=>onCreate(selection ?? undefined)}>Create review</button></footer>
    {editing&&<dialog ref={dialog=>{if(dialog&&!dialog.open)dialog.showModal();}} className="student-picker dialog" aria-labelledby="edit-students" onCancel={()=>setEditing(null)}>
      <h2 id="edit-students">Edit students</h2>
      <p>Choose the students to include in the review draft.</p>
      <label>Search students in Class 6A<input autoFocus value={query} onChange={event=>setQuery(event.target.value)}/></label>
      <div className="student-options">{selectableStudents.filter(name=>name.toLowerCase().includes(query.trim().toLowerCase())).map(name=><label className="checkline" key={name}>
        <input type="checkbox" checked={editing.includes(name)} onChange={()=>setEditing(editing.includes(name)?editing.filter(student=>student!==name):[...editing,name])}/>
        {name} {roster.includes(name)&&<span className="evidence-pill">Suggested</span>}
      </label>)}</div>
      <footer><small>{editing.length} selected</small><div className="actions"><button onClick={()=>setEditing(null)}>Cancel</button><button className="primary" disabled={!editing.length} onClick={()=>{setSelection(editing);setExpanded(null);setEditing(null);}}>Save students</button></div></footer>
    </dialog>}
  </section>;
}
