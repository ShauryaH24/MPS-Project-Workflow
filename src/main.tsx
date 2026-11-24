import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {materials,students,duration,validSchedule,canSubmit,initialDraft} from './domain.mjs';
import {RecommendedReview, ReviewGlyph, groups} from './RecommendedReview';
import {RecommendationDetail} from './RecommendationDetail';
import './style.css';

type Draft=typeof initialDraft;
const icons=['imgIconCalendarDays','imgIcon','imgIcon1','imgIcon2','imgIcon3','imgIcon4','imgIcon5','imgIcon6'];
const nav=['Calendar','Groups','Assigned tests','Exercise sets','Learning content','Video lessons','Protau','Downloads'];
function Icon({name,size=16}:{name:string,size?:number}){return <img alt="" src={`/assets/${name}.svg`} width={size} height={size}/>;}
function Button({children,onClick,primary=false,disabled=false}:{children:React.ReactNode,onClick?:()=>void,primary?:boolean,disabled?:boolean}){return <button type="button" disabled={disabled} className={primary?'primary':''} onClick={onClick}>{children}</button>;}
function App(){
 const [page,setPage]=useState('overview');const [step,setStep]=useState(0);const [draft,setDraft]=useState<Draft>(()=>{try{const d=JSON.parse(localStorage.getItem('info5900-draft-v1')||'null');return d?{...initialDraft,...d,reviewed:false}:initialDraft;}catch{return initialDraft;}});
 const [query,setQuery]=useState('');const [type,setType]=useState('All types');const [groupIndex,setGroupIndex]=useState(0);const [flag,setFlag]=useState(false);const [dialog,setDialog]=useState<string|null>(null);const [notice,setNotice]=useState('');const [zoom,setZoom]=useState(100);const [failure,setFailure]=useState(false);const [submitted,setSubmitted]=useState(false);const [receipt,setReceipt]=useState<Draft|null>(null);
 const [recipientOptions,setRecipientOptions]=useState(()=>[...new Set([...students,...draft.recipients])]);
 const update=(p:Partial<Draft>)=>{setDraft(d=>({...d,...p,reviewed:false}));setFailure(false);};
 const go=(p:string,s=0)=>{setPage(p);setStep(s);setNotice('');window.scrollTo(0,0);};
 const save=()=>{try{localStorage.setItem('info5900-draft-v1',JSON.stringify(draft));setNotice('Draft saved on this device.');}catch{setNotice('Storage unavailable. Keep this tab open to retain your draft.');}};
 const toggle=(id:string)=>update({selected:draft.selected.includes(id)?draft.selected.filter((i:string)=>i!==id):[...draft.selected,id]});
 const count=draft.selected.length;const mins=duration(draft.selected);const summary=`${draft.recipients.length} students · ${count} activities · ${mins} minutes`;
 const isPrep=page==='prepare';const next=()=>{setStep(step+1);window.scrollTo(0,0);};
 const labels=['Assemble material','Differentiate','Review draft','Choose action','Confirm'];
 const position=Math.min(4,step===4?3:step);
 const title=step===4?(draft.action==='plan'?'Schedule in Curriculum plan':'Assignment settings'):step===5?(draft.action==='plan'?'Confirm class plan':'Confirm assigned test'):labels[step];
 const selectedMaterials=materials.filter(material=>draft.selected.includes(material.id));
 const openOther=(label:string)=>{if(label==='Groups')go('overview');else if(label==='Assigned tests')go('assignments');else setDialog(`${label} is outside this F3 prototype. Calendar and the design system are still being revised.`);};
 return <div className="shell" style={{fontSize:`${zoom}%`}}>
 <aside><img className="logo" src="/assets/imgModeText.svg" alt="elicėjus" width="103" height="32"/><button className="profile" onClick={()=>setDialog('Emma Taylor · Teacher. Sample account for usability testing.')}><span className="avatar"><Icon name="imgIconUser" size={14}/></span><span><strong>Emma Taylor</strong><small>Teacher</small></span><Icon name="imgIconChevronsUpDown" size={14}/></button>
 <nav aria-label="Teacher navigation">{nav.map((n,i)=><button key={n} aria-current={(n==='Groups'&&page!=='assignments')||(n==='Assigned tests'&&page==='assignments')?'page':undefined} onClick={()=>openOther(n)}><Icon name={icons[i]}/>{n}</button>)}</nav><div className="community"><button onClick={()=>setDialog('Teacher community is outside this local prototype.')}><Icon name="imgNameFacebookColorsOriginal"/>Facebook group<Icon name="imgIconExternalLink" size={14}/></button></div><div className="textsize"><small>Text size</small><div><button aria-label="Decrease text size" onClick={()=>setZoom(Math.max(90,zoom-10))}><Icon name="imgIconMinus" size={14}/></button><output>{zoom}%</output><button aria-label="Increase text size" onClick={()=>setZoom(Math.min(130,zoom+10))}><Icon name="imgIconPlus" size={14}/></button></div></div></aside>
 <main>
 <header>
   <button className="icon-label textlink header-back" onClick={()=>go('overview')}><ReviewGlyph name="back"/> Back</button>
   <div><strong>Group</strong><p><span className="class-avatar compact">6A</span> Class 6A</p></div>
   <Button primary onClick={()=>setDialog('To assign suggested review practice, open a review group and confirm the assignment after reviewing the draft.')}><span className="icon-label"><Icon name="imgIconPlus" size={14}/> Assign test</span></Button>
 </header>
 <div className="class-card">
   <h2><span className="class-avatar">6A</span> Class 6A</h2>
   <div className="actions">
     <Button onClick={()=>setDialog('Group editing is outside this prototype. Class 6A contains 24 sample students.')}><span className="icon-label"><ReviewGlyph name="edit"/> Edit group</span></Button>
     <Button onClick={()=>setDialog('Access codes are unavailable in this local prototype.')}><span className="icon-label"><ReviewGlyph name="code"/> Access Code <Icon name="imgIconExternalLink" size={14}/></span></Button>
   </div>
 </div>
 <div className="workspace">
 <div className="tabs">{[['Overview','24 students'],['Tests','Assigned tests'],['Recommended review','3 suggested groups'],['Curriculum plan',submitted&&receipt?.action==='plan'?'1 review planned':'No lesson planned']].map(([a,b])=>{
   const selected = a === (page === 'assignments' ? 'Tests' : page === 'plan' ? 'Curriculum plan' : 'Recommended review');
   return <button key={a} aria-current={selected?'page':undefined} className={selected?'selected':''} onClick={()=>a==='Recommended review'?go('overview'):a==='Tests'?go('assignments'):a==='Curriculum plan'?go('plan'):setDialog('Group overview is outside the F3 test scope.')}><strong>{a}</strong><small>{b}</small></button>;
 })}</div>
 <div className="workspace-content">
 {notice&&<p className="notice" role="status">{notice}</p>}
 <div hidden={page!=='overview'}><RecommendedReview onOpen={title=>{
   setGroupIndex(groups.findIndex(group=>group.title===title));
   go('evidence');
 }}/></div>
 {page==='evidence'&&<RecommendationDetail key={groupIndex} groupIndex={groupIndex} recipients={draft.recipients}
   flagged={flag} onToggleFlag={()=>setFlag(!flag)} onBack={()=>go('overview')} onCreate={selected=>{
     if(selected){
       setRecipientOptions(options=>[...new Set([...options,...selected])]);
       update({recipients:selected});
     }
     go('prepare');
   }}/>}
 {isPrep&&<section className="flow-screen">
 <button className="textlink icon-label flow-back" onClick={()=>step===0?(setGroupIndex(0),go('evidence')):setStep(step-1)}><ReviewGlyph name="back"/> {['Finding equivalent fractions','Assemble material','Differentiate','Review draft','Choose action',draft.action==='plan'?'Schedule in Curriculum plan':'Assignment settings'][step]}</button>
 <div className="flow-heading"><h1>{title}</h1>{step<5&&<span className="evidence-pill">{step===1?'Optional':'Draft'}</span>}</div>
 <p className="subtitle">{step===1?'Optional — adjust support for individual students or continue.':`Equivalent fractions review · ${summary}`}</p>
 <ol className="progress-steps" aria-label="Review preparation">{labels.map((label,index)=><li key={label} className={index<position?'complete':''} aria-current={position===index?'step':undefined}><span>{index<position?'✓':index+1}</span>{label}</li>)}</ol>
 {step===0&&<>
 <div className="flow-split">
   <article className="flow-panel">
     <h2>Review draft</h2><p className="muted">{count} materials · {mins} min</p>
     <ul className="material-list">{selectedMaterials.map(material=><li key={material.id}><small>{material.type}</small><strong>{material.title}</strong><span>{material.minutes} min</span></li>)}</ul>
     {count===0&&<p>Select material from the results below.</p>}
   </article>
   <article className="flow-panel">
     <h2>Review summary</h2>
     <dl className="detail-list"><dt>Students</dt><dd>{draft.recipients.join(', ')||'No students selected'}</dd><dt>Total time</dt><dd>{mins} min</dd></dl>
     <p className="muted">Nothing is sent until you confirm.</p>
   </article>
 </div>
 <article className="flow-panel library-panel">
 <h2>Content results</h2>
 <label className="search"><span className="sr-only">Search materials</span><input placeholder="Search lessons, stations, practice sets and exercises" value={query} onChange={e=>setQuery(e.target.value)}/></label><div className="filters materialfilters">{[['Subject','Mathematics'],['Course','Grade 6 mathematics'],['Chapter','Fractions'],['Lesson','Visual models']].map(([l,o])=><label key={l}>{l}<select><option>{o}</option></select></label>)}<label>Content type<select value={type} onChange={e=>setType(e.target.value)}>{['All types','Lesson','Station','Practice set','Exercise'].map(t=><option key={t}>{t}</option>)}</select></label><label>Evidence alignment<select><option>Suggested relevance</option></select></label></div>{materials.filter(m=>m.title.toLowerCase().includes(query.toLowerCase())&&(type==='All types'||m.type===type)).map(m=><article key={m.id} className={'material '+(draft.selected.includes(m.id)?'chosen':'')}><input type="checkbox" aria-label={`Select ${m.title}`} checked={draft.selected.includes(m.id)} onChange={()=>toggle(m.id)}/><div><small>{m.type} · {m.minutes} min</small><h3>{m.title}</h3><p className="muted">Mathematics → Grade 6 mathematics → Fractions → Visual models for equivalent fractions</p><small>Suggested relevance: {m.reason}</small></div><Button onClick={()=>setDialog(`${m.title} · ${m.type} · ${m.minutes} minutes. Teacher preview: complete 2/3 = □/12. Expected response: 8/12. Explain why both parts are multiplied by 4.`)}>Preview</Button></article>)}{!materials.some(m=>m.title.toLowerCase().includes(query.toLowerCase())&&(type==='All types'||m.type===type))&&<article><h2>No matching bank material</h2><p>Your selected material remains in the draft.</p><Button onClick={()=>{setQuery('');setType('All types');}}>Clear search and filters</Button></article>}
 </article></>}
 {step===1&&<article className="flow-panel"><h2>Support</h2>
   <p className="muted">{draft.recipients.length} students · {count} materials · {mins} min</p>
   <div className="tablewrap"><table><thead><tr><th scope="col">Student</th><th scope="col">Evidence</th><th scope="col">Support type</th></tr></thead>
   <tbody>{students.map((name,index)=><tr key={name}><th scope="row">{name}</th><td><small>{index===2?'Insufficient evidence':index===0?'Repeated evidence':'Individual evidence unavailable'}</small></td><td><select aria-label={`Support type for ${name}`} value={draft.support[index]} onChange={e=>update({support:draft.support.map((v:string,j:number)=>index===j?e.target.value:v)})}>{['Visual model + guided example','Standard review sequence','Short evidence check before practice'].map(o=><option key={o}>{o}</option>)}</select></td></tr>)}</tbody></table></div>
   <label className="teacher-note">Teacher note<textarea value={draft.note} onChange={event=>update({note:event.target.value})}/></label>
 </article>}
 {step===2&&<article className="flow-panel">
 <div className="row"><h2>Students · {draft.recipients.length}</h2><Button onClick={()=>setStep(4)}>Edit recipients</Button></div>
 <p>{draft.recipients.join(', ')}</p>
 <p className="muted">Learning goal: Finding equivalent fractions · Fractions checkpoint, 12 Oct</p>
 <div className="row panel-section"><h2>Review materials</h2><Button onClick={()=>setStep(0)}>Edit materials</Button></div>
 <ul className="material-list">{selectedMaterials.map(material=><li key={material.id}><small>{material.type}</small><strong>{material.title}</strong><span>{material.minutes} min</span></li>)}</ul>
 <div className="row panel-section"><h2>Support</h2><Button onClick={()=>setStep(1)}>Edit support</Button></div>
 {draft.recipients.map(name=><p key={name}><strong>{name}</strong> · {draft.support[students.indexOf(name)] ?? 'No individual support set'}</p>)}{draft.note&&<p>{draft.note}</p>}
 </article>}
 {step===3&&<><h2>Where should this review go?</h2>{[
   {value:'assignment',label:'Assign now',description:'Create a local assigned test for selected students.',scope:'Selected students',icon:'imgIcon1'},
   {value:'plan',label:'Add to class plan',description:'Create a local Curriculum plan entry for this review.',scope:'Curriculum plan',icon:'imgIconCalendarDays'},
 ].map(option=><label className={'actioncard '+(draft.action===option.value?'chosen':'')} key={option.value}>
   <span className="class-avatar"><Icon name={option.icon}/></span>
   <input type="radio" name="action" checked={draft.action===option.value} onChange={()=>update({action:option.value})}/>
   <span className="action-description"><strong>{option.label}</strong><span>{option.description}</span></span>
   <span className="evidence-pill action-scope">{option.scope}</span>
 </label>)}<p className="muted">Nothing is sent or scheduled until you confirm.</p></>}
 {step===4&&<div className="flow-split">
 <article className="flow-panel"><h2>{draft.action==='assignment'?'Assignment setup':'Date and recipients'}</h2>
 <fieldset><legend>Recipients</legend>{recipientOptions.map(name=><label className="checkline" key={name}><input type="checkbox" checked={draft.recipients.includes(name)} onChange={()=>update({recipients:draft.recipients.includes(name)?draft.recipients.filter(recipient=>recipient!==name):[...draft.recipients,name]})}/>{name}</label>)}</fieldset>
 <div className="filters"><label>Start date<input type="date" value={draft.start} onChange={event=>update({start:event.target.value})}/></label><label>{draft.action==='plan'?'End date':'Due date'}<input type="date" value={draft.due} min={draft.start} onChange={event=>update({due:event.target.value})}/></label></div>
 {!validSchedule(draft.start,draft.due)&&<p role="alert" className="error callout">End date must be on or after the start date.</p>}
 </article>
 <article className="flow-panel"><h2>{draft.action==='assignment'?'Assigned test':'Curriculum plan'}</h2>
 <dl className="detail-list"><dt>Students</dt><dd>{draft.recipients.length}</dd><dt>Duration</dt><dd>{mins} min</dd></dl>
 <p className="muted">{draft.action==='plan'?'Timetable conflict checks are unavailable in this local prototype.':'Show results after teacher review.'}</p>
 </article>
 </div>}
 {step===5&&<>
 <article className="flow-panel"><h2>{draft.action==='assignment'?'Students receive one Assigned test':'Curriculum plan review'}</h2><p className="muted">Review the selected materials, recipients, and dates before confirming.</p></article>
 <div className="flow-split">
   <article className="flow-panel">
     <div className="row"><h2>Recipients · {draft.recipients.length}</h2><div className="actions"><Button onClick={()=>setStep(1)}>Edit support</Button><Button onClick={()=>setStep(4)}>Edit recipients</Button></div></div>
     <div className="tablewrap"><table><thead><tr><th scope="col">Student</th><th scope="col">Support</th></tr></thead><tbody>
     {draft.recipients.map(name=><tr key={name}><th scope="row">{name}</th><td>{draft.support[students.indexOf(name)] ?? 'No individual support set'}</td></tr>)}
     </tbody></table></div>
     <div className="row panel-section"><h2>Review materials</h2><Button onClick={()=>setStep(0)}>Edit materials</Button></div>
     <ul className="material-list">{selectedMaterials.map(material=><li key={material.id}><small>{material.type}</small><strong>{material.title}</strong><span>{material.minutes} min</span></li>)}</ul>
   </article>
   <article className="flow-panel">
     <div className="row"><h2>{draft.action==='assignment'?'Assigned test':'Curriculum plan'}</h2><Button onClick={()=>setStep(4)}>Edit dates</Button></div>
     <dl className="detail-list"><dt>Title</dt><dd>Equivalent fractions review</dd><dt>Start date</dt><dd>{draft.start}</dd><dt>End date</dt><dd>{draft.due}</dd><dt>Initial status</dt><dd>Not started</dd></dl>
   </article>
 </div>
 {failure&&<div role="alert" className="error callout">Submission failed in test mode. Your draft is retained. Turn off simulated failure and retry.</div>}<details className="testing"><summary>Prototype test controls</summary><label className="checkline"><input type="checkbox" onChange={e=>setFailure(e.target.checked)} checked={failure}/>Simulate submission failure</label></details></>}
 <footer className="flow-footer">
 {step===5?<label className="checkline"><input type="checkbox" checked={draft.reviewed} onChange={event=>setDraft(current=>({...current,reviewed:event.target.checked}))}/>I have reviewed the students, evidence, materials, and schedule.</label>:step>0&&<Button onClick={()=>setStep(step-1)}>Back</Button>}
 <div className="actions"><Button onClick={save}>Save draft</Button>{step<5?<Button primary disabled={count===0||(step===4&&(!validSchedule(draft.start,draft.due)||!draft.recipients.length))} onClick={next}>{step===4?(draft.action==='plan'?'Review schedule':'Review assignment'):'Continue'}</Button>:<Button primary disabled={!canSubmit(draft)} onClick={()=>{if(failure){setNotice('Submission failed. Draft preserved; retry with test failure turned off.');return;}setReceipt(structuredClone(draft));setSubmitted(true);go('success');}}>{draft.action==='assignment'?'Confirm and assign':'Confirm and add to plan'}</Button>}</div></footer></section>}
 {page==='success'&&receipt&&<section className="flow-screen">
 <article className="flow-panel">
   <h1>{receipt.action==='assignment'?'Assigned test created':'Added to Curriculum plan'}</h1>
   <p className="muted">Equivalent fractions review · {receipt.recipients.length} students · {receipt.selected.length} materials · {duration(receipt.selected)} min</p>
   <dl className="receipt-details">
     <div><dt>Recipients</dt><dd>{receipt.recipients.join(', ')}</dd></div>
     <div><dt>Availability</dt><dd>{receipt.start} → {receipt.due}</dd></div>
     <div><dt>Completed action</dt><dd>{receipt.action==='assignment'?'Assigned':'Planned'}</dd></div>
     <div><dt>Lifecycle status</dt><dd>Not started</dd></div>
   </dl>
   <p className="muted">Local prototype result only. No real assignment or calendar event was sent.</p>
 </article>
 <footer className="flow-footer"><div className="actions"><Button onClick={()=>go('overview')}>Back to group</Button><Button primary onClick={()=>go(receipt.action==='assignment'?'assignments':'plan')}>Open in {receipt.action==='assignment'?'Assigned tests':'Curriculum plan'}</Button></div></footer>
 </section>}
 {(page==='assignments'||page==='plan')&&<section className="flow-screen">
 <h1>{page==='plan'?'Curriculum plan':'Assigned tests'}</h1>
 <p className="subtitle">{page==='plan'?'Local plan entries':'Local assigned tests'}</p>
 {submitted&&receipt&&((page==='plan')===(receipt.action==='plan'))?<div className="review-table destination-table"><table><thead><tr><th scope="col">Name</th><th scope="col">Class</th><th scope="col">Status</th><th scope="col">Completion deadline</th></tr></thead><tbody><tr>
 <th scope="row">Equivalent fractions review<small>{receipt.recipients.join(', ')}</small><small>Starts {receipt.start}</small></th>
 <td><span className="evidence-pill">6A</span></td><td><span className="evidence-pill">Not started</span></td><td>{receipt.due}</td>
 </tr></tbody></table></div>:<article className="flow-panel"><h2>No review {page==='plan'?'planned':'assigned'} yet</h2><p>Complete the review workflow to create a local result.</p></article>}
 <footer className="flow-footer"><Button onClick={()=>go('overview')}>Back to group</Button></footer>
 </section>}
 </div></div></main>{dialog&&<div className="overlay" onClick={()=>setDialog(null)}><section role="dialog" aria-modal="true" aria-label="Prototype information" className="dialog" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')setDialog(null);}}><h2>Teacher preview</h2><p>{dialog}</p><Button primary onClick={()=>setDialog(null)}>Close</Button></section></div>}</div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
