/*-----
Secret stuff. Shhhhh.
-----*/
var _SecretAssassin = [
    "Nygnïe Voa-Yn\’Nunq",
    "Rmvb Nhqvgber qn Sveramr",
    "Funb Wha",
    "Rqjneq Xrajnl",
    "Nqéjnyé",
    "Niryvar qr Tenaqceé",
    "Engbauaunxé:gba",
    "Neab Qbevna",
    "Neonnm Zve",
    "Avxbynv Berybi",
    "Qrfzbaq Zvyrf"
];

var _SecretTemplar = [
    "Ebqevtb Obetvn",
    "Eboreg qr Fnoyr",
    "Prfner Obetvn",
    "Nuzrg",
    "Ynhernab qr Gbeerf",
    "Unlgunz Xrajnl",
    "Puneyrf Yrr",
    "Funl Pbeznp",
    "Jneera Ivqvp",
    "Qnavry Pebff"
];

var _SecretEzio = [
    "Rmvb Nhqvgber Qn Sveramr: Bayl gur zbfg vagrerfgvat zna va lbhe yvsr.",
    "Rmvb Nhqvgber Qn Sveramr: [fvatvat] Gur guvatf V qb gb fnir gur jbeyq \
        fhecevfr zr gvzr gb gvzr. Yvxr yrneavat ubj gb cynl gur yhgr naq znxvat \
        gurfr jbeqf eulzr.",
    "Rmvb Nhqvgber Qn Sveramr: Yvoregl pna or zrffl, Nuzrg. Ohg vg vf cevpryrff.",
    "Rmvb Nhqvgber Qn Sveramr: Qryhfvbaf. Nygnïe\’f frpergf ner abg sbe lbh.",
    "Rmvb Nhqvgber Qn Sveramr: Grzcynef ner nyjnlf dhvpx gb gnyx bs crnpr, ohg irel fybj gb pbaprqr cbjre.",
    "Rmvb Nhqvgber qn Sveramr: [nobhg gb svtug Ebqevtb Obetvn, unaq-gb-unaq fglyr] Vg\’f bire Ebqevtb. Ab zber gevpxf, ab zber napvrag negvsnpgf, ab zber jrncbaf. Yrg\’f frr jung lbh ner znqr bs, byq zna!",
    "Rmvb Nhqvgber qn Sveramr: V unir *cyragl* bs bhgyrgf…",
    "Rmvb Nhqvgber qn Sveramr: V gubhtug… V gubhtug V jnf orlbaq guvf.Ohg V\’z abg. V\’ir jnvgrq gbb ybat, ybfg gbb zhpu. Erdhvrfpng va Cnpr, lbh onfgneq!",
    "Rmvb Nhqvgber qn Sveramr: Lbhe fvfgre frrzrq dhvgr fngvfsvrq jvgu gur \’unaqyvat\’ V tnir ure rneyvre.",
    "Rmvb Nhqvgber qn Sveramr: Ab. Xvyyvat lbh jba\’g oevat zl snzvyl onpx. V\’z qbar. Ahyyn è ernyr, ghggb è yrpvgb. Erdhvrfpng va cnpr.",
    "Gur Nhqvgber ner abg qrnq! V\’z fgvyy urer! ZR! Rmvb! Rmvb Nhqvgber!!"
];

var _SecretAlan = [
    "Ehffvn Jvgu Ybir ;;  \
Ebfn Xyroo: Vg jnf lbhe cyna, gurl sbyybjrq vzcyvpvgyl. ;;  \
Xebafgrra: Vzcbffvoyr, vg jnf cresrpg. ;;  \
Ebfn Xyroo: Rkprcg sbe bar guvat, gurl jrer qrnyvat jvgu Obaq. ;;  \
Xebafgrra: Jub vf Obaq...",
    "Ehffvn Jvgu Ybir ;  \
Gngvnan: Gur zrpunavfz vf... Bu Wnzrf, Wnzrf, jvyy lbh znxr ybir gb zr nyy gur gvzr va Ratynaq? ;  \
Obaq: Qnl naq avtug. Tb ba nobhg gur zrpunavfz.",
    "Ehffvn Jvgu Ybir ;  \
[nsgre pnhfvat n FCRPGER uryvpbcgre gb rkcybqr] ;  \
Obaq: V'q fnl bar bs gurve nvepensg vf zvffvat.",
    "Ehffvn Jvgu Ybir ;  \
Ebfn Xyroo: Genvavat vf hfrshy, ohg gurer vf ab fhofgvghgr sbe rkcrevrapr.;  \
Zberaml: V nterr.Jr hfr yvir gnetrgf nf jryy.",
    " Qe. Ab ;  \
Obaq: V nqzver lbhe pbhentr, Zvff...? ;  \
Flyivn Gerapu: Gerapu.Flyivn Gerapu.V nqzver lbhe yhpx, Ze..? ;  \
Obaq: Obaq. Wnzrf Obaq",
    " Qe. Ab  ;  \
Z: Vg unccraf gb or 3 n.z.Jura qb lbh fyrrc 007?  ;  \
Obaq: Arire ba gur svez'f gvzr, Fve.",
    " Qe. Ab ;  \
[Obaq neevirf ng Tbireazrag Ubhfr jvgu Ze.Wbarf qrnq va gur onpxfrng] ;  \
Obaq: Fretrnag, znxr fher ur qbrfa'g trg njnl. ",
    " Qe. Ab ;  \
Zbarlcraal: Zr, tvira na bhapr bs rapbhentrzrag.Lbh'ir arire gnxra zr gb qvaare ybbxvat yvxr guvf. Lbh'ir arire gnxra zr gb qvaare... ;  \
Obaq: V jbhyq, lbh xabj.Bayl Z jbhyq unir zr pbheg - znefunyrq sbe vyyrtny hfr bs tbireazrag cebcregl. ;  \
Zbarlcraal: Synggrel jvyy trg lbh abjurer.Ohg qba'g fgbc gelvat.",
    " Qe. Ab ;  \
Qe. Ab:	Rnfg, Jrfg, whfg cbvagf bs gur pbzcnff, rnpu nf fghcvq nf gur bgure. ",
    " Guhaqreonyy ;  \
Obaq: Qb lbh rkcrpg zr gb gnyx? ;  \
Tbyqsvatre: Ab, Ze. Obaq. V rkcrpg lbh gb qvr!",
    " Guhaqreonyy ;  \
Obaq: Zl qrne tvey, qba'g synggre lbhefrys. Jung V qvq guvf riravat jnf sbe Xvat naq pbhagel. Lbh qba'g guvax vg tnir zr nal cyrnfher, qb lbh? ;  \
Svban Ibycr: Ohg bs pbhefr, V sbetbg lbhe rtb, Ze. Obaq. ",
    " Guhaqreonyy ;  \
Zbarlcraal: Hu - uhu, va gur pbasrerapr ebbz.Rirel qbhoyr - 0 va Rhebcr unf orra ehfurq va, naq gur Ubzr Frpergnel gbb. ;  \
Obaq:	Fbzrobql'f cebonoyl ybfg n qbt. ",
    " Lbh Bayl Yvir Gjvpr ;  \
Oybsryq: Wnzrf Obaq, nyybj zr gb vagebqhpr zlfrys.V nz Reafg Fgnieb Oybsryq.Gurl gbyq zr lbh jrer nffnffvangrq va Ubat Xbat. ;  \
Obaq: Lrf, guvf vf zl frpbaq yvsr. ;  \
Oybsryq: Lbh bayl yvir gjvpr, Ze. Obaq ",
    " Lbh Bayl Yvir Gjvpr ;  \
Urytn Oenaqg:	V'ir tbg lbh abj. ;  \
Obaq:	Jryy, rawbl lbhefrys. ",
    " Lbh Bayl Yvir Gjvpr ;  \
Qvxxb Uraqrefba: Gung jnf fgveerq, abg funxra? V ubcr V tbg vg evtug. ",
    "Lbh Bayl Yvir Gjvpr ;  \
Oybsryq: Bayl bar crefba jr xabj hfrf guvf fbeg bs tha.Wnzrf Obaq. ;  \
Ze. Bfngb: Ohg Obaq vf qrnq! ;  \
Urytn Oenaqg: Vg jnf va nyy gur arjfcncref. ;  \
Oybsryq: Ehoovfu, Obaq vf nyvir. Hayrff lbh xvyyrq uvz, Ze Bfngb. Qba'g gryy zr lbh yrg uvz tb.",
    "Ba Ure Znwrfgl'f Frperg Freivpr ;  \
Obaq: Guvf arire unccrarq gb gur bgure sryybj. [va ertneqf gb Pbaarel'f Obaq] ",
    "Ba Ure Znwrfgl'f Frperg Freivpr ;  \
Obaq: Gunax lbh, D, ohg guvf gvzr V'ir tbg gur tnqtrgf, naq V xabj ubj gb hfr gurz.",
    "Ba Ure Znwrfgl'f Frperg Freivpr ;  \
Qenpb:	Zl ncbybtvrf sbe gur jnl lbh jrer oebhtug urer. V jnfa'g fher lbh'q npprcg n sbezny vaivgngvba. ;  \
Obaq:	Gurer'f nyjnlf fbzrguvat sbezny nobhg gur cbvag bs n cvfgby.",
    "Ba Ure Znwrfgl'f Frperg Freivpr ;  \
Qenpb:	Fur yvxrf lbh, V pna frr vg. ;  \
Obaq: Lbh zhfg tvir zr gur anzr bs lbhe bphyvfg ",
    "Ba Ure Znwrfgl'f Frperg Freivpr ;  \
Obaq: Nyyretl inppvarf? Onpgrevn... Onpgrevbybtvpny Jnesner. ;  \
Oybsryq: Jvgu n qvssrerapr. Bhe ovt oernxguebhtu fvapr ynfg fhzzre unf orra gur pbasrpgvba bs n pregnva.. Ivehf Bzrtn.",
    "Qvnzbaqf Ner Sberire ;  \
Obaq: Jryy, bar bs hf fzryyf yvxr n gneg'f unaqxrepuvrs. V'z nsenvq vg'f zr, fbeel byq obl.",
    "Qvnzbaqf Ner Sberire ;  \
Obaq: Cvgl nobhg lbhe yvire, fve.Na hahfhnyyl svar Fbyren. '51 V oryvrir. ;  \
Z: Gurer vf ab lrne sbe fureel, 007. ;  \
Obaq: V jnf ersreevat gb gur bevtvany ivagntr ba juvpu gur fureel vf onfrq, fve. 1851, hazvfgnxnoyr. ;  \
Fve Zhatre: Cerpvfryl. ",
    "Qvnzbaqf Ner Sberire ;  \
Funql Gerr: Lbh qvegl qbhoyr-pebffvat yvzrl svax! Gubfr tbqqnza qvnzbaqf ner cubavrf!",
    "Yvir Naq Yrg Qvr ;  \
Pnool:	Hcgbja? Lbh urnqrq vagb Uneyrz zna! ;  \
Obaq: Jryy, lbh whfg xrrc ba gur gnvy bs gung whxrobk, naq gurer'f na rkgen gjragl va vg sbe lbh. ;  \
Pnool:	Url zna, sbe gjragl ohpxf, V'yy gnxr lbh gb n Xh Xyhk Xyna pbbx bhg! ",
    "Yvir Naq Yrg Qvr ;  \
Zbarlcraal: Tbbqolr Wnzrf. Be fubhyq V fnl: Pvnb, Oryyb ",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Furevss W.J.:	Abj, V xabj lbh! Lbh'er gung frperg ntrag! Gung Ratyvfu frperg ntrag, sebz Ratynaq!",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Fnvqn:	V'ir ybfg zl punez! ;  \
Obaq:	Abg sebz jurer V'z fgnaqvat. ",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Z: Fb, vs V urneq pbeerpgyl, Fpnenznatn tbg njnl. ;  \
Obaq: Lrf, fve. ;  \
Z: Va n pne gung fcebhgrq jvatf? ;  \
D: Gung'f cresrpgyl srnfvoyr, fve. Va snpg, jr'er jbexvat ba bar abj. ;  \
Z: Bu, D, fuhg hc!",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Fpnenznatn:	N qhry orgjrra gvgnaf.Zl tbyqra tha ntnvafg lbhe Jnygure CCX.Rnpu bs hfr jvgu n svsgl - svsgl punapr. ;  \
Obaq:	Fvk ohyyrgf gb lbhe bja? ;  \
Fpnenznatn:	V bayl arrq bar. ;  \
Obaq:	Fbhaqf n ovg byq snfuvbarq, qbrfa'g vg? V zrna, cvfgbyf ng qnja, gung fbeg bs guvat. ;  \
Fpnenznatn:	Vaqrrq vg vf, Ze. Obaq. Ohg vg fgvyy erznvaf gur bayl gehr grfg sbe tragyrzra. ;  \
Obaq:	V qbhog vs lbh dhnyvsl ba gung fpber. ",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Fpnenznatn: Bhef vf gur ybaryvrfg cebsrffvba, Ze.Obaq.",
    "Gur Zna jvgu gur Tbyqra Tha ;  \
Obaq: N tha va n ont bs crnahgf. Ubj bevtvany, jung jvyy gurl guvax bs arkg?",
    "Gur Fcl Jub Ybirq Zr  ;  \
Obaq:	Zzz, znlor V zvfwhqtrq Fgebzoret. Nal zna jub qevaxf Qbz Crevtaba '52 pna'g or nyy onq.",
    "Gur Fcl Jub Ybirq Zr  ;  \
D: Evtug, abj cnl nggragvba 007.V jnag lbh gb gnxr terng pner bs guvf rdhvczrag.Gurer ner bar be gjb engure fcrpvny npprffbevrf.. ;  \
Obaq: D, unir V rire yrg lbh qbja? ;  \
D: Serdhragyl.",
    "Gur Fcl Jub Ybirq Zr  ;  \
Obaq: Fgvyy, lbh qvq fnir zl yvsr. ;  \
Ntrag KKK: Jr nyy znxr zvfgnxrf, Ze. Obaq. ",
    "Gur Fcl Jub Ybirq Zr  ;  \
Tvey: Ohg Wnzrf, V arrq lbh! ;  \
Obaq: Fb qbrf Ratynaq! ",
    "Gur Fcl Jub Ybirq Zr  ;  \
trag KKK: Pbzznaqre Wnzrf Obaq, erpehvgrq gb gur Oevgvfu Frperg Freivpr sebz gur Eblny Anil.Yvprafr gb xvyy, naq unf qbar fb ba ahzrebhf bppnfvbaf.Znal ynql sevraqf, ohg zneevrq bayl bapr.Jvsr xvyyrq... ;  \
Obaq: Lbh'ir znqr lbhe cbvag. ;  \
Ntrag KKK: Lbh'er frafvgvir, Ze.Obaq? ;  \
Obaq: Nobhg fbzr guvatf.",
    "Gur Fcl Jub Ybirq Zr ;  \
Z: Zbarlcraal, jurer'f 007? ;  \
Zbarlcraal: Ur'f ba n zvffvba fve, va Nhfgevn. ;  \
Z: Jryy, gryy uvz gb chyy bhg. Vzzrqvngryl.",
    "Zbbaenxre ;  \
Zbarlcraal:Jul ner lbh fb yngr Wnzrf? ;  \
Obaq: V sryy bhg bs na nvecynar jvgubhg n cnenpuhgr.",
    "Zbbaenxre ;  \
Uhtb Qenk: Serqrevpx Tenl! Jung n fhecevfr. Naq va qvfgvathvfurq pbzcnal, nyy jrnevat tnf znfxf. Lbh zhfg rkphfr zr, tragyrzra. Abg orvat Ratyvfu, V fbzrgvzrf svaq lbhe frafr bs uhzbhe engure qvssvphyg gb sbyybj!",
    "Zbbaenxre ;  \
Uhtb Qenk: Ubj jbhyq unir Bfpne Jvyqr unir chg vg? Gb ybbfr bar nvepensg jbhyq or na nppvqrag. Gb ybbfr gjb, jbhyq frrz yvxr pneryrffarff.",
    "Zbbaenxre ;  \
Qe. Tbbqurnq: Lbh xabj uvz? ;  \
Obaq: Abg fbpvnyyl. Uvf anzr'f Wnjf, ur xvyyf crbcyr.",
    "Zbbaenxre ;  \
Obaq: Zbbaenxre svr, gung'f gur nafjre. Qenk'f fuhggyr vf nezrq jvgu n ynfre.",
    "Zbbaenxre ;  \
Obaq: Bu, V fhccbfr lbh'er evtug. Jr jbhyq or orggre bss jbexvat gbtrgure. Qégragr? ;  \
Qe. Tbbqurnq:	Nterrq. ;  \
Obaq:	Haqrefgnaqvat? ;  \
Qe. Tbbqurnq:	Cbffvoyl. ;  \
Obaq:	Pbbcrengvba? ;  \
Qe. Tbbqurnq:	Znlor. ;  \
Obaq:	Gehfg? ;  \
Qe. Tbbqurnq:	Bhg bs gur dhrfgvba",
    "Zbbaenxre ;  \
D: Vg'f npgvingrq ol areir vzchyfrf sebz gur jevfg zhfpyrf. ;  \
Obaq:	Yvxr guvf? [fubbgf Z'f cnvagvat] ;  \
Z: Bu, gunax - lbh, 007! ;  \
D: Or pnershy jvyy lbh!Abj, gurer'f gra qnegf: 5 oyhr-gvccrq, nezbhe cvrepvat. 5 erq-gvccrq, plnavqr pbngrq, pnhfvat qrngu va guvegl frpbaqf. ;  \
Obaq:	Irel abiry, D. Zhfg trg gurz va fgberf sbe Puevfgznf.",
    "Sbe Lbhe Rlrf Bayl ;  \
Ovov:	Jung gbbx lbh fb ybat? ;  \
Obaq:	Jryy, V gbbx gur fpravp ebhgr.",
    "Sbe Lbhe Rlrf Bayl ;  \
Obaq: Gur Puvarfr unir n fnlvat: Orsber lbh frg bhg ba eriratr, lbh svefg qvt gjb tenirf.",
    "Sbe Lbhe Rlrf Bayl ;  \
Obaq: Uryyb Fzlguref, ubj'f gur nez? ;  \
Fzlguref: Pbzvat nybat avpryl, Fve. ;  \
Obaq: Fznfuvat!",
    "Bpgbchffl ;  \
Ivwnl: Vf ur fgvyy gurer? ;  \
D: Lbh zhfg or wbxvat! 007, ba na vfynaq fheebhaqrq rkpyhfviryl ol jbzra. Lbh jba'g frrz uvz 'gvyy qnja.",
    "Bpgbchffl ;  \
Xnzny Xnua: Obaq unf rfpncrq! ;  \
Bpgbchffl: Ubj pneryrff bs lbh.Bu, ol gur jnl Xnzny, V jbhyq yvxr lbh gb zrrg zl arj ubhfr thrfg. ;  \
Obaq: Na byq sevraq bs gur snzvyl, lbh zvtug fnl. ;  \
Xnzny Xnua: Lbh unir n anfgl unovg bs fheivivat. ;  \
Obaq: Bu, lbh xabj jung gurl fnl nobhg gur svggrfg..",
    "Bpgbchffl ;  \
Obaq: Yrg'f fnl, sbe nethzrag'f fnxr, gung V qba'g srry yvxr gnyxvat. ;  \
Xnzny Xnua: Qba'g jbeel, lbh jvyy. ;  \
Obaq: Yrg zr thrff, guhzofperjf naq ubg pbnyf? ;  \
Xnzny Xnua: Uneqyl. Jr ner zhpu zber fbcuvfgvpngrq guna gung!",
    "N Ivrj Gb N Xvyy ;  \
Znl Qnl: Jbj, jung n ivrj! ;  \
Znk Mbeva: Gb n xvyy!",
    "N Ivrj Gb N Xvyy ;  \
Obaq: Jryy, npghnyyl Pncgnva, V'z jvgu gur Oevgvfu Frperg Freivpr. Gur anzr'f Obaq, Wnzrf Obaq. ;  \
Cbyvpr Pncgnva:	Vf ur? ;  \
Fgnprl Fhggba:	Ner lbh? ;  \
Obaq:	Lrf. ;  \
Cbyvpr Pncgnva:	Naq V'z Qvpx Genpl. Naq lbh'er fgvyy haqre neerfg.",
    "N Ivrj Gb N Xvyy  ;  \
Z: V jbhyq unir rkcrpgrq gur XTO gb pryroengr vs Fvyvpba Inyyrl unq orra qrfgeblrq. ;  \
Tra. Tbtby: Ba gur pbagenel, Nqzveny. Jurer jbhyq Ehffvna erfrnepu or jvgubhg vg?",
    "Gur Yvivat Qnlyvtugf ;  \
Obaq: Whfg gnxvat gur Nfgba bhg sbe n fcva, D. ;  \
D: Or pnershy, 007, vg'f whfg unq n arj pbng bs cnvag!",
    "Gur Yvivat Qnlyvtugf ;  \
Fnhaqref: V'z gryyvat Z lbh qryvorengryl zvffrq. Lbhe beqref jrer gb xvyy gung favcre. ;  \
Obaq: Fghss zl beqref! V bayl xvyy cebsrffvbanyf. Gung tvey qvqa'g xabj bar raq bs n evsyr sebz gur bgure. Tb nurnq, gryy Z vs lbh jnag. Vs ur sverf zr, V'yy gunax uvz sbe vg.",
    "Yvprafr Gb Xvyy ;  \
Qryyn Yrvgre: Bu, Wnzrf, jbhyq lbh zvaq? Sryvk vf fgvyy va gur fghql, naq jr'ir tbg gb phg guvf pnxr. ;  \
Obaq:	V'yy qb nalguvat sbe n jbzna jvgu n xavsr.",
    "Yvprafr Gb Xvyy ;  \
Obaq: Gura lbh unir zl erfvtangvba, fve. ;  \
Z: Jr'er abg n pbhagel pyho, 007. Rssrpgvir vzzrqvngryl, lbhe yvprafr gb xvyy vf eribxrq, naq V erdhver lbh gb unaq bire lbhe jrncba. Abj. V arrq uneqyl erzvaq lbh gung lbh'er fgvyy obhaq ol gur Bssvpvny Frpergf Npg.",
    "Tbyqrarlr ;  \
Angnyln Fvzbabin: Qb lbh qrfgebl rirel iruvpyr lbh trg vagb? ;  \
Obaq: Fgnaqneq bcrengvat cebprqher.Oblf jvgu gblf.",
    "Tbyqrarlr ;  \
Obevf Tevfuraxb	V nz vaivapvoyr!",
    "Tbyqrarlr ;  \
Z: Vs lbh guvax sbe bar zbzrag V qba'g unir gur onyyf gb fraq n zna bhg gb qvr, lbhe vafgvapgf ner qrnq jebat.",
    "Tbyqrarlr ;  \
D: Abj, guvf V'z cnegvphyneyl cebhq bs. Oruvaq gur urnqyvtugf, fgvatre zvffvyrf! ;  \
Obaq: Rkpryyrag, whfg gur guvat sbe hajvaqvat nsgre n ebhtu qnl ng gur bssvpr. ;  \
D: Arrq V erzvaq lbh, 007, gung lbh unir n yvprafr gb xvyy, abg gb oernx gur genssvp ynjf.",
    "Tbyqrarlr ;  \
Wnpx Jnqr: Wnpx Jnqr, PVN ;  \
Obaq: Wnzrf Obaq, fgvss-nff Oevg.",
    "Tbyqrarlr ;  \
Kravn Bangbcc: Lbh qba'g arrq gur tha, Pbzznaqre. ;  \
Obaq: Jryy, gung qrcraqf ba lbhe qrsvavgvba bs fnsr frk.",
    "Gbzbeebj Arire Qvrf ;  \
D: Vg'f gur vafhenapr qnzntr jnvire sbe lbhe ornhgvshy arj pne. Abj, jvyy lbh arrq pbyyvfvba pbirentr? ;  \
Obaq: Lrf. ;  \
D: Sver? ;  \
Obaq:	Cebonoyl. ;  \
D: Crefbany Vawhel? ;  \
Obaq: V ubcr abg, ohg nppvqragf qb unccra. ;  \
D: Gurl serdhragyl qb jvgu lbh. ;  \
Obaq: Jryy, gung gnxrf pner bs gur abezny jrne naq grne. V gurer nal bgure cebgrpgvba V arrq? ;  \
D: Bayl sebz zr, 007, hayrff lbh oevat gung pne onpx va cevfgvar beqre.",
    "Gbzbeebj Arire Qvrf ;  \
D: Urer'f lbhe pryy cubar. Gnyx urer, yvfgra urer. ;  \
Obaq: Fb gung'f jung V'ir orra qbvat jebat nyy gurfr lrnef.",
    "Gbzbeebj Arire Qvrf ;  \
Ze. Fgnzcre: Qebc gur xavsr, Ze. Obaq, be V qebc lbhe sevraq.",
    "Gbzbeebj Arire Qvrf ;  \
Obaq: Vg jba'g ybbx yvxr n fhvpvqr vs lbh fubbg zr sebz bire gurer. ;  \
Qe. Xnhszna: V nz n cebsrffbe bs sberafvp zrqvpvar. Oryvrir zr, Ze. Obaq, V pbhyq fubbg lbh sebz Fghggtneg naq fgvyy perngr gur cebcre rssrpg.",
    "Gur Jbeyq vf Abg Rabhtu ;  \
Inyragva Mhxbifxl: V'z ybbxvat sbe n fhoznevar. Vg'f ovt naq oynpx, naq gur qevire vf n irel tbbq sevraq bs zvar.",
    "Gur Jbeyq vf Abg Rabhtu ;  \
Ryrxgen Xvat: V pbhyq unir tvira lbh gur jbeyq. ;  \
Obaq: Gur jbeyq vf abg rabhtu. ;  \
Ryrxgen Xvat: Sbbyvfu fragvzrag. ;  \
Obaq: Snzvyl zbggb.",
    "Gur Jbeyq vf Abg Rabhtu ;  \
Obaq: Pbafgehpgvba vfa'g rknpgyl zl fcrpvnyvgl. ;  \
Z: Dhvgr gur bccbfvgr, va snpg.",
    "Gur Jbeyq vf Abg Rabhtu ;  \
Qvr Nabgure Qnl ;  \
Thfgni Tenirf: Ner lbh n tnzoyvat zna, Ze.Obaq? ;  \
Obaq: Vs gur fgnxrf ner evtug.",
    "Gur Jbeyq vf Abg Rabhtu ;  \
Ze. Xvy: V'z Ze. Xvy. ;  \
Obaq: Abj gurer'f n anzr gb qvr sbe."
];
//# sourceMappingURL=secret.js.map
