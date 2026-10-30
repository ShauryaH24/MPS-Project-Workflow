export const materials = [
 {id:'lesson',type:'Lesson',title:'Visual models for equivalent fractions',minutes:5,reason:'Visual models connect equal values to scaling both parts.'},
 {id:'station',type:'Station',title:'Scale numerator and denominator',minutes:4,reason:'Apply the same factor to numerator and denominator.'},
 {id:'practice',type:'Practice set',title:'Equivalent fractions · Grade 6',minutes:6,reason:'Practice applying a shared scale factor; teacher to verify suitability.'},
 {id:'exercise',type:'Exercise',title:'Complete 2/3 = □/12',minutes:1,reason:'A single missing-numerator example for teacher review.'}
];
export const students = ['Amelia Reed','Noah Wilson','Sofia Martin'];
export const learningStatus=['Needs review','Secure','Insufficient evidence'];
export const equivalentStatus=['Needs review','Needs review','Insufficient evidence'];
export function duration(ids){return materials.filter(m=>ids.includes(m.id)).reduce((n,m)=>n+m.minutes,0);}
export function validSchedule(start,due){return Boolean(start && due && due>=start);}
export function canSubmit(draft){return draft.selected.length>0 && draft.recipients.length>0 && draft.reviewed && validSchedule(draft.start,draft.due);}
export const initialDraft={selected:['lesson','station','practice'],recipients:[...students],support:['Visual model + guided example','Standard review sequence','Short evidence check before practice'],action:'assignment',start:'2026-10-23',due:'2026-10-30',reviewed:false,note:''};
const datePattern=/^\d{4}-\d{2}-\d{2}$/;
export function beginReview(draft){return {...draft,reviewed:false};}
export function restoreDraft(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return beginReview({...initialDraft,recipients:[...students],support:[...initialDraft.support],selected:[...initialDraft.selected]});
 const selected=Array.isArray(raw.selected)&&raw.selected.every(id=>materials.some(m=>m.id===id))?[...raw.selected]:[...initialDraft.selected];
 const recipients=Array.isArray(raw.recipients)&&raw.recipients.every(name=>students.includes(name))?[...raw.recipients]:[...initialDraft.recipients];
 const support=Array.isArray(raw.support)&&raw.support.length===students.length&&raw.support.every(value=>initialDraft.support.includes(value))?[...raw.support]:[...initialDraft.support];
 const action=raw.action==='plan'||raw.action==='assignment'?raw.action:initialDraft.action;
 const start=typeof raw.start==='string'&&datePattern.test(raw.start)?raw.start:initialDraft.start;
 const due=typeof raw.due==='string'&&datePattern.test(raw.due)?raw.due:initialDraft.due;
 const note=typeof raw.note==='string'?raw.note:'';
 return {selected,recipients,support,action,start,due,note,reviewed:false};
}
