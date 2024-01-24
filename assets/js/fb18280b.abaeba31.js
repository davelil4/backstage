/*! For license information please see fb18280b.abaeba31.js.LICENSE.txt */
"use strict";(self.webpackChunkbackstage_microsite=self.webpackChunkbackstage_microsite||[]).push([[402380],{94422:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var s=t(824246),r=t(511151);const i={},a=void 0,c={id:"publishing",title:"publishing",description:"npm",source:"@site/../docs/publishing.md",sourceDirName:".",slug:"/publishing",permalink:"/docs/publishing",draft:!1,unlisted:!1,editUrl:"https://github.com/backstage/backstage/edit/master/docs/../docs/publishing.md",tags:[],version:"current",frontMatter:{}},o={},l=[{value:"npm",id:"npm",level:2},{value:"Creating a new release",id:"creating-a-new-release",level:3},{value:"Next Line Release Process",id:"next-line-release-process",level:2},{value:"Main Line Release Process",id:"main-line-release-process",level:2},{value:"Switching Release Modes",id:"switching-release-modes",level:2},{value:"Emergency Release Process",id:"emergency-release-process",level:2},{value:"Old Process",id:"old-process",level:3}];function h(e){const n=Object.assign({h2:"h2",p:"p",a:"a",code:"code",h3:"h3",ul:"ul",li:"li",strong:"strong",pre:"pre",input:"input"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"npm",children:"npm"}),"\n",(0,s.jsxs)(n.p,{children:["npm packages are published through CI/CD in the\n",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/blob/master/.github/workflows/deploy_packages.yml",children:(0,s.jsx)(n.code,{children:".github/workflows/deploy_packages.yml"})}),"\nworkflow. Every commit that is merged to master will be checked for new versions\nof all public packages, and any new versions will automatically be published to\nnpm."]}),"\n",(0,s.jsx)(n.h3,{id:"creating-a-new-release",children:"Creating a new release"}),"\n",(0,s.jsx)(n.p,{children:'Releases are handled by changesets and trigger whenever the "Version Packages"\nPR is merged. This is typically done every Tuesday around noon CET.'}),"\n",(0,s.jsx)(n.h2,{id:"next-line-release-process",children:"Next Line Release Process"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"PR Checks: Notify the teams & ensure there are no outstanding PRs pending to be merged for this version. This should be done in time to ensure a smooth release day. If there are any, reach out to maintainers and relevant owners of the affected code reminding them of the deadline for the release."}),"\n",(0,s.jsxs)(n.li,{children:["Lock main branch\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Lock the main branch to prevent any new merges by other maintainers. Do not unlock the main branch until the release was published successfully"}),"\n",(0,s.jsx)(n.li,{children:"Core maintainers can still merge last PRs using their admin override including the Version Packages PR"}),"\n",(0,s.jsx)(n.li,{children:"Note: Admin rights are required to lock the branch. If you lack the necessary permissions, contact a core maintainer to perform this action on your behalf."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Check ",(0,s.jsxs)(n.a,{href:"https://github.com/backstage/backstage/pulls?q=is%3Aopen+is%3Apr+in%3Atitle+%22Version+Packages+%28next%29%22",children:[(0,s.jsx)(n.code,{children:"Version Packages (next)"})," Pull Request"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Verify the version we are shipping is correct, by looking at the version packages PR title. It should be "Version Packages (next)"'}),"\n",(0,s.jsxs)(n.li,{children:["Check ",(0,s.jsx)(n.code,{children:"pre.json"})," in ",(0,s.jsxs)(n.a,{href:"https://github.com/backstage/backstage/blob/master/.changeset",children:["the ",(0,s.jsx)(n.code,{children:".changeset"})," folder"]})," - it should have ",(0,s.jsx)(n.code,{children:'"mode": "pre"'})," near the top. If you encounter ",(0,s.jsx)(n.code,{children:'"mode": "exit"'})," or if the file doesn't exist, it indicates a mainline release."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Verify that there are no active/unfinished ",(0,s.jsx)(n.code,{children:"sync_version-packages"})," actions running (",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/actions/workflows/sync_version-packages.yml",children:"https://github.com/backstage/backstage/actions/workflows/sync_version-packages.yml"}),")\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Locking the main branch will prevent new ones to be created, but be sure to check for running actions again after unlocking, since it may cause pending auto-merge PRs to be merged."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Check ",(0,s.jsxs)(n.a,{href:"https://github.com/backstage/backstage/pulls?q=is%3Aopen+is%3Apr+in%3Atitle+%22Version+Packages+%28next%29%22",children:[(0,s.jsx)(n.code,{children:"Version Packages (next)"})," Pull Request"]})," for sufficient approval to be merged\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Check generated ",(0,s.jsx)(n.code,{children:"changelog"})," in the changed files of the pull request under ",(0,s.jsx)(n.code,{children:"docs/releases"})," to see if there are any unexpected major bumps e.g. by searching the file"]}),"\n",(0,s.jsx)(n.li,{children:"Review & approve changes"}),"\n",(0,s.jsx)(n.li,{children:"Reach out to core maintainer to merge the pull request"}),"\n",(0,s.jsxs)(n.li,{children:["Heads-up: The microsite building step can be skipped as long as the ",(0,s.jsx)(n.code,{children:"prettier"})," task passes & everything else looks green"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Merging the ",(0,s.jsx)(n.code,{children:"Version Packages (next)"})," Pull Request will trigger the deployment workflows. Follow along the ",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/actions/workflows/deploy_packages.yml",children:"deployment workflow"}),". If you notice flakiness (e.g. if the build is flaky or if the release step runs into an error with releasing to npm) just restart the workflow."]}),"\n",(0,s.jsxs)(n.p,{children:["Congratulations on the release! There should be now a post in the ",(0,s.jsxs)(n.a,{href:"https://discord.com/channels/687207715902193673/705123584468582400",children:[(0,s.jsx)(n.code,{children:"#announcements"})," channel"]})," in Discord linking to the release tag - check if links & tag look as expected. Once the notification has gone out on Discord you can unlock the main branch & the release is complete."]}),"\n",(0,s.jsx)(n.h2,{id:"main-line-release-process",children:"Main Line Release Process"}),"\n",(0,s.jsx)(n.p,{children:"Additional steps for the main line release"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"#switching-release-modes",children:"Switch Release Mode"})," to exit pre-release mode. This can be done at any time after the last Next Line Release.\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Check ",(0,s.jsx)(n.code,{children:".changeset/pre.json"}),"  if the ",(0,s.jsx)(n.code,{children:"mode"})," is set to ",(0,s.jsx)(n.code,{children:"exit"}),". If you encounter ",(0,s.jsx)(n.code,{children:'mode: "pre"'})," it indicates a next line release."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Check ",(0,s.jsxs)(n.a,{href:"https://github.com/backstage/backstage/pulls?q=is%3Aopen+is%3Apr+in%3Atitle+%22Version+Packages",children:[(0,s.jsx)(n.code,{children:"Version Packages"})," Pull Request"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:'Check for mentions of "major" & "breaking" and if they are expected in the current release'}),"\n",(0,s.jsx)(n.li,{children:"Verify the version we are shipping is correct"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Create Release Notes\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["There exists a ",(0,s.jsx)(n.a,{href:"/docs/v1.1.0",children:"release notes template"})," for creating the release notes. It can already be created after the last main line release to keep track of major changes during the month"]}),"\n",(0,s.jsx)(n.li,{children:"The content is picked by relevancy showcasing the work of the community during the month of the release"}),"\n",(0,s.jsx)(n.li,{children:"Mention newly added packages or features"}),"\n",(0,s.jsx)(n.li,{children:"Mention any security fixes"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Create Release Notes PR\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Add the release note file as ",(0,s.jsx)(n.a,{href:"./releases",children:(0,s.jsx)(n.code,{children:"/docs/releases/vx.y.0.md"})})]}),"\n",(0,s.jsxs)(n.li,{children:["Add an entry to ",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/blob/master/microsite/sidebars.json",children:(0,s.jsx)(n.code,{children:"/microsite/sidebar.json"})})," for the release note"]}),"\n",(0,s.jsxs)(n.li,{children:["Update the navigation bar item in ",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/blob/master/microsite/docusaurus.config.js",children:(0,s.jsx)(n.code,{children:"/microsite/docusaurus.config.js"})})," to point to the new release note"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Once the release has been published edit the newly created release in the ",(0,s.jsx)(n.a,{href:"https://github.com/backstage/backstage/releases",children:"GitHub repository"})," and replace the text content with the release notes."]}),"\n",(0,s.jsx)(n.h2,{id:"switching-release-modes",children:"Switching Release Modes"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["To enter pre-release mode: ",(0,s.jsx)(n.code,{children:"yarn changeset pre enter next"})," & create PR + merge changes"]}),"\n",(0,s.jsxs)(n.li,{children:["To exit pre-release mode: ",(0,s.jsx)(n.code,{children:"yarn changeset pre exit"})," & create PR + merge changes\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Has to be done before the mainline release"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"It's not time critical; Affects the next release happening"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"emergency-release-process",children:"Emergency Release Process"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"This emergency release process is intended only for the Backstage\nmaintainers."})}),"\n",(0,s.jsx)(n.p,{children:"Given one or more PRs towards master that we want to create a patch release for, run the following script from the repo root:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"./scripts/patch-release-for-pr.js <pr-number> <pr-number-2> ...\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Wait until the script has finished executing, at the end of the output you will find a link of the format ",(0,s.jsx)(n.code,{children:"https://github.com/backstage/backstage/compare/patch/..."}),'. Open this link in your browser to create a PR for the patch release. Finish the sentence "This release fixes an issue where..." and create the PR.']}),"\n",(0,s.jsxs)(n.p,{children:["Once the PR has been approved and merged, the patch release will be automatically created. The patch release is complete when a notification has been posted to Discord in the ",(0,s.jsx)(n.code,{children:"#announcements"}),' channel. Keep an eye on "Deploy Packages" workflow and re-trigger if it fails. It is safe to re-trigger any part of this workflow, including the release step.']}),"\n",(0,s.jsx)(n.p,{children:"If the above process fails, you can fall back to the manual process documented below."}),"\n",(0,s.jsx)(n.h3,{id:"old-process",children:"Old Process"}),"\n",(0,s.jsx)(n.p,{children:"This is the old and manual process that we used before the patch script, provided here as a reference:"}),"\n",(0,s.jsxs)(n.p,{children:["For this example we will be using the ",(0,s.jsx)(n.code,{children:"@backstage/plugin-foo"})," package as an\nexample and assume that it is currently version ",(0,s.jsx)(n.code,{children:"6.5.0"})," in the master branch."]}),"\n",(0,s.jsxs)(n.p,{children:["In the event of a severe bug being introduced in version ",(0,s.jsx)(n.code,{children:"6.5.0"})," of the\n",(0,s.jsx)(n.code,{children:"@backstage/plugin-foo"})," released in the ",(0,s.jsx)(n.code,{children:"v1.18.0"})," Backstage release, the following\nprocess is used to release an emergency fix as version ",(0,s.jsx)(n.code,{children:"6.5.1"})," in the patch release ",(0,s.jsx)(n.code,{children:"v1.18.1"}),":"]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Identify the release or releases that need to be patched. We should always\npatch the most recent major or minor main-line release if needed, which in this example\nwould be ",(0,s.jsx)(n.code,{children:"v1.18.0"}),". The fix may also need backporting to older major\nversions, in which case we will want to patch the main-line release just\nbefore the one that bumped the package to each new major version."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Repeat the following steps for each release that needs to be patched:"]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Make sure a patch branch exists for the release that is being patched.\nIf a patch already exists, reuse the existing branch. The branch ",(0,s.jsx)(n.strong,{children:"must\nalways"})," be named exactly ",(0,s.jsx)(n.code,{children:"patch/<release>"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git checkout v1.18.0\ngit checkout -b patch/v1.18.0\ngit push --set-upstream origin patch/v1.18.0\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," With the ",(0,s.jsx)(n.code,{children:"patch/v1.18.0"})," branch as a base, create a new\nbranch for your fix. This branch can be named anything, but the\nfollowing naming pattern may be suitable:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git checkout -b ${USER}/plugin-foo-v1.18.0-fix\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Create a single commit that applies fix, nothing else."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Create a changeset for the affected package(s), then run ",(0,s.jsx)(n.code,{children:"yarn release"})," in the root\nof the repo in order to convert your changeset into package version bumps and changelog entries.\nCommit these changes as a second ",(0,s.jsx)(n.code,{children:'"Generated release"'})," commit."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Create PR towards the base branch (",(0,s.jsx)(n.code,{children:"patch/v1.18.0"}),") containing the two commits."]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0}),' Add a PR body, it will be used as the release description. Typically something like "This release fixes ...".']}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Review/Merge the PR into ",(0,s.jsx)(n.code,{children:"patch/v1.18.0"}),". This will automatically trigger a release."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Look up the new version of our package in the patch PR as well as the new release\nversion, these can be found in the package ",(0,s.jsx)(n.code,{children:"package.json"})," and the root ",(0,s.jsx)(n.code,{children:"package.json"}),", and\nwill in this case be ",(0,s.jsx)(n.code,{children:"6.5.1"})," and ",(0,s.jsx)(n.code,{children:"v1.18.1"}),". You will need these versions later."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Make sure you have the latest versions of the patch branch fetched, after merging the PR: ",(0,s.jsx)(n.code,{children:"git fetch"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," Once fixes have been created for each release, the fix should be applied to the\nmaster branch as well. Create a PR that contains the following:"]}),"\n",(0,s.jsxs)(n.ul,{className:"contains-task-list",children:["\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," The fix, which you can likely cherry-pick from your patch branch: ",(0,s.jsx)(n.code,{children:"git cherry-pick origin/patch/v1.18.0^"})]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0})," An updated ",(0,s.jsx)(n.code,{children:"CHANGELOG.md"})," of all patched packages from the tip of the patch branch, ",(0,s.jsx)(n.code,{children:"git checkout origin/patch/v1.18.0 -- {packages,plugins}/*/CHANGELOG.md"}),". Note that if the patch happens after any next-line releases you'll need to restore those entries in the changelog, placing the patch release entry beneath any next-line release entries."]}),"\n",(0,s.jsxs)(n.li,{className:"task-list-item",children:[(0,s.jsx)(n.input,{type:"checkbox",disabled:!0}),' A changeset with the message "Applied the fix from version ',(0,s.jsx)(n.code,{children:"6.5.1"})," of this package, which is part of the ",(0,s.jsx)(n.code,{children:"v1.18.1"}),' release of Backstage."']}),"\n"]}),"\n"]}),"\n"]})]})}const d=function(e={}){const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(h,e)})):h(e)}},371426:(e,n,t)=>{var s=t(827378),r=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,c=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function l(e,n,t){var s,i={},l=null,h=null;for(s in void 0!==t&&(l=""+t),void 0!==n.key&&(l=""+n.key),void 0!==n.ref&&(h=n.ref),n)a.call(n,s)&&!o.hasOwnProperty(s)&&(i[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps)void 0===i[s]&&(i[s]=n[s]);return{$$typeof:r,type:e,key:l,ref:h,props:i,_owner:c.current}}n.Fragment=i,n.jsx=l,n.jsxs=l},541535:(e,n)=>{var t=Symbol.for("react.element"),s=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),o=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),u=Symbol.for("react.lazy"),p=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},x=Object.assign,m={};function g(e,n,t){this.props=e,this.context=n,this.refs=m,this.updater=t||f}function b(){}function j(e,n,t){this.props=e,this.context=n,this.refs=m,this.updater=t||f}g.prototype.isReactComponent={},g.prototype.setState=function(e,n){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")},g.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=g.prototype;var y=j.prototype=new b;y.constructor=j,x(y,g.prototype),y.isPureReactComponent=!0;var k=Array.isArray,v=Object.prototype.hasOwnProperty,w={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function R(e,n,s){var r,i={},a=null,c=null;if(null!=n)for(r in void 0!==n.ref&&(c=n.ref),void 0!==n.key&&(a=""+n.key),n)v.call(n,r)&&!_.hasOwnProperty(r)&&(i[r]=n[r]);var o=arguments.length-2;if(1===o)i.children=s;else if(1<o){for(var l=Array(o),h=0;h<o;h++)l[h]=arguments[h+2];i.children=l}if(e&&e.defaultProps)for(r in o=e.defaultProps)void 0===i[r]&&(i[r]=o[r]);return{$$typeof:t,type:e,key:a,ref:c,props:i,_owner:w.current}}function P(e){return"object"==typeof e&&null!==e&&e.$$typeof===t}var C=/\/+/g;function S(e,n){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return n[e]}))}(""+e.key):n.toString(36)}function N(e,n,r,i,a){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var o=!1;if(null===e)o=!0;else switch(c){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case t:case s:o=!0}}if(o)return a=a(o=e),e=""===i?"."+S(o,0):i,k(a)?(r="",null!=e&&(r=e.replace(C,"$&/")+"/"),N(a,n,r,"",(function(e){return e}))):null!=a&&(P(a)&&(a=function(e,n){return{$$typeof:t,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}(a,r+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(C,"$&/")+"/")+e)),n.push(a)),1;if(o=0,i=""===i?".":i+":",k(e))for(var l=0;l<e.length;l++){var h=i+S(c=e[l],l);o+=N(c,n,r,h,a)}else if(h=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof h)for(e=h.call(e),l=0;!(c=e.next()).done;)o+=N(c=c.value,n,r,h=i+S(c,l++),a);else if("object"===c)throw n=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function E(e,n,t){if(null==e)return e;var s=[],r=0;return N(e,s,"","",(function(e){return n.call(t,e,r++)})),s}function O(e){if(-1===e._status){var n=e._result;(n=n()).then((function(n){0!==e._status&&-1!==e._status||(e._status=1,e._result=n)}),(function(n){0!==e._status&&-1!==e._status||(e._status=2,e._result=n)})),-1===e._status&&(e._status=0,e._result=n)}if(1===e._status)return e._result.default;throw e._result}var T={current:null},A={transition:null},I={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:A,ReactCurrentOwner:w};n.Children={map:E,forEach:function(e,n,t){E(e,(function(){n.apply(this,arguments)}),t)},count:function(e){var n=0;return E(e,(function(){n++})),n},toArray:function(e){return E(e,(function(e){return e}))||[]},only:function(e){if(!P(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},n.Component=g,n.Fragment=r,n.Profiler=a,n.PureComponent=j,n.StrictMode=i,n.Suspense=h,n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I,n.cloneElement=function(e,n,s){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=x({},e.props),i=e.key,a=e.ref,c=e._owner;if(null!=n){if(void 0!==n.ref&&(a=n.ref,c=w.current),void 0!==n.key&&(i=""+n.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(l in n)v.call(n,l)&&!_.hasOwnProperty(l)&&(r[l]=void 0===n[l]&&void 0!==o?o[l]:n[l])}var l=arguments.length-2;if(1===l)r.children=s;else if(1<l){o=Array(l);for(var h=0;h<l;h++)o[h]=arguments[h+2];r.children=o}return{$$typeof:t,type:e.type,key:i,ref:a,props:r,_owner:c}},n.createContext=function(e){return(e={$$typeof:o,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},n.createElement=R,n.createFactory=function(e){var n=R.bind(null,e);return n.type=e,n},n.createRef=function(){return{current:null}},n.forwardRef=function(e){return{$$typeof:l,render:e}},n.isValidElement=P,n.lazy=function(e){return{$$typeof:u,_payload:{_status:-1,_result:e},_init:O}},n.memo=function(e,n){return{$$typeof:d,type:e,compare:void 0===n?null:n}},n.startTransition=function(e){var n=A.transition;A.transition={};try{e()}finally{A.transition=n}},n.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},n.useCallback=function(e,n){return T.current.useCallback(e,n)},n.useContext=function(e){return T.current.useContext(e)},n.useDebugValue=function(){},n.useDeferredValue=function(e){return T.current.useDeferredValue(e)},n.useEffect=function(e,n){return T.current.useEffect(e,n)},n.useId=function(){return T.current.useId()},n.useImperativeHandle=function(e,n,t){return T.current.useImperativeHandle(e,n,t)},n.useInsertionEffect=function(e,n){return T.current.useInsertionEffect(e,n)},n.useLayoutEffect=function(e,n){return T.current.useLayoutEffect(e,n)},n.useMemo=function(e,n){return T.current.useMemo(e,n)},n.useReducer=function(e,n,t){return T.current.useReducer(e,n,t)},n.useRef=function(e){return T.current.useRef(e)},n.useState=function(e){return T.current.useState(e)},n.useSyncExternalStore=function(e,n,t){return T.current.useSyncExternalStore(e,n,t)},n.useTransition=function(){return T.current.useTransition()},n.version="18.2.0"},827378:(e,n,t)=>{e.exports=t(541535)},824246:(e,n,t)=>{e.exports=t(371426)},511151:(e,n,t)=>{t.d(n,{Zo:()=>c,ah:()=>i});var s=t(667294);const r=s.createContext({});function i(e){const n=s.useContext(r);return s.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function c({components:e,children:n,disableParentContext:t}){let c;return c=t?"function"==typeof e?e({}):e||a:i(e),s.createElement(r.Provider,{value:c},n)}}}]);