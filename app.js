/* ===================== State & persistence ===================== */
const STORAGE_KEY = 'bulkContractTracker_v2';
const THEME_KEY = 'bulkContractTracker_theme';
const LANG_KEY = 'bulkContractTracker_lang';

function defaultState(){
  return { contracts: [], purchaseOrders: [], workDone: [], permits: [], collectionTargets: [], adminContacts: [],
    collectionSummary: { odUtilization: 0, creditorsOutstanding: 0, asOfDate: '' } };
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  }catch(e){
    console.error('Gagal load data', e);
    return defaultState();
  }
}
let state = loadState();
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ===================== i18n ===================== */
const I18N = {
  ms: {
    appTagline: 'Sistem Penjejakan Kontrak',
    nav_contract: 'Contract', nav_po: 'PO Tracking', nav_workdone: 'Work Done',
    nav_permit: 'Permit Tracking', nav_complete: 'Project Completed', nav_collection: 'Collection Target',
    nav_overlap: 'PO Bertindih', nav_admin: 'Admin',
    sidebar_foot: 'Data disimpan secara lokal di browser ini. Sila backup secara berkala.',
    btn_backup: 'Backup Data', btn_uploadbackup: 'Upload Backup',
    title_contract: 'Contract', title_po: 'PO Tracking', title_workdone: 'Work Done',
    title_permit: 'Permit Tracking', title_complete: 'Project Completed', title_collection: 'Collection Target',
    title_overlap: 'PO Bertindih', title_admin: 'Admin',

    btn_template: 'Muat Turun Template', btn_upload: 'Upload Excel', btn_export: 'Export',
    btn_cancel: 'Batal', btn_save: 'Simpan', btn_close: 'Tutup', btn_delete: 'Padam',
    action_edit: 'Edit', action_delete: 'Padam', action_complete: 'Selesai', action_reopen: 'Buka Semula',
    action_history: 'Sejarah', action_addupdate: '+ Update',
    import_result_title: 'Keputusan Import',

    th_contractno: 'Contract No', th_area: 'Kawasan', th_company: 'Company', th_branch: 'Cawangan',
    th_ceiling: 'Nilai Kontrak', th_totalpo: 'Jumlah PO', th_variance: 'Baki / Lebihan', th_util: 'Utilisasi',
    th_status: 'Status', th_progress: 'Progress (%)', th_guarantee: 'BD / BG', th_dateupdate: 'Date Update',

    /* Page 1 Contract */
    contract_heading: 'Contract', contract_sub: 'Senarai kontrak pukal, siling, dan jaminan bank (BD/BG)',
    alert_overbudget_title: '{n} kontrak melebihi nilai kontrak (over budget)',
    lbl_po: 'PO', lbl_ceiling: 'Nilai Kontrak', lbl_vs: 'vs', lbl_exceeded: 'lebih',
    kpi_contracts: 'Jumlah Kontrak', kpi_contracts_sub: '{n} lebih siling',
    kpi_ceiling: 'Nilai Kontrak (Total)',
    kpi_po: 'Jumlah PO Dikeluarkan', kpi_po_sub: '{n} PO',
    kpi_actual: 'Jumlah Work Done Actual',
    kpi_balance: 'Baki Belum Siap',
    kpi_pofull: 'PO Full (Jumlah)', kpi_poclaim: 'PO Claim', kpi_polbalance: 'Balance to Claim',
    btn_addcontract: '+ Tambah Kontrak',
    status_notset: 'Belum ditetapkan', status_over: 'Lebih Siling', status_nosiling: 'Tiada Siling', status_ok: 'OK',
    bu_title: 'PO mengikut Cawangan', bu_sub: 'Top 10 mengikut jumlah PO',
    bu_empty: 'Tiada data lagi.', bu_none: '(Tiada Cawangan)',
    contract_empty: 'Tiada kontrak lagi. Tambah atau upload kontrak untuk mula.',
    contract_form_add: 'Tambah Kontrak', contract_form_edit: 'Kemaskini Kontrak',
    fld_contractno: 'Contract No *', fld_contractvalue: 'Contract Value (RM)', fld_area: 'Area',
    fld_startdate: 'Start Date', fld_enddate: 'End Date', fld_company: 'Company', fld_branch: 'Branch',
    fld_guaranteetype: 'Bank (BD) / Bank Guarantee (BG)', fld_guaranteeamount: 'Amount BD / BG (RM)',
    fld_guaranteestart: 'Start Date (BD/BG)', fld_guaranteeend: 'End Date (BD/BG)',
    opt_bd: 'BD', opt_bg: 'BG', opt_none: '--',
    err_contractno_required: 'Contract No wajib diisi', err_contract_exists: 'Contract No ini sudah wujud',
    err_contract_haspo: 'Tidak boleh padam — kontrak ini masih ada PO berkaitan. Padam/tukar PO dahulu.',
    toast_contract_saved: 'Kontrak disimpan', toast_contract_deleted: 'Kontrak dipadam',
    confirm_delete_contract: 'Padam kontrak ini?',

    /* Page 2 PO Tracking */
    po_heading: 'PO Tracking', po_sub: 'Senarai PO merentasi semua cawangan di bawah setiap kontrak pukal',
    search_placeholder_po: 'Cari Contract No / Project Name / PO Number / PIC...',
    search_placeholder_contract: 'Cari Contract No / Area / Company / Branch...',
    btn_addpo: '+ Tambah PO',
    fld_displayname: 'Project Name', fld_ponumber: 'PO Number *', fld_poamount: 'PO Amount *',
    fld_podate: 'Date PO', fld_saidi: 'SAIDI', fld_pmt: 'PMT', fld_ps: 'Project Secretary (PS)',
    fld_remark: 'Remarks', fld_pic: 'PIC Name',
    po_th_displayname: 'Project Name', po_th_ponumber: 'PO Number', po_th_poamount: 'PO Amount',
    po_th_podate: 'Date PO', po_th_saidi: 'SAIDI', po_th_permitstatus: 'Permit Status', po_th_pmt: 'PMT',
    po_th_ps: 'PS', po_th_remark: 'Remarks', po_th_pic: 'PIC Name',
    po_th_claimamount: 'Claim Amount', po_th_claimdate: 'Claim Date', po_th_balance: 'Balance to Claim',
    po_empty: 'Tiada rekod PO. Upload Excel atau tambah PO baharu.',
    po_modal_add: 'Tambah PO', po_modal_edit: 'Kemaskini PO',
    hint_po: 'Permit Status dikemaskini automatik dari Permit Tracking. Progress dikira automatik dari Work Done.',
    err_no_contracts_yet: 'Tiada kontrak dalam sistem lagi. Sila tambah kontrak dahulu di page Contract.',
    err_contract_notfound: 'Contract No ini belum wujud. Sila tambah kontrak dahulu di page Contract.',
    toast_po_required: 'Contract No dan PO Number wajib diisi',
    toast_po_saved: 'PO disimpan', toast_po_deleted: 'PO dipadam',
    toast_po_completed: 'Projek ditandakan selesai', toast_po_reopened: 'Projek dibuka semula',
    confirm_delete_po: 'Padam rekod PO ini?',
    permit_none: 'Tiada Permit',

    /* Page 3 Work Done */
    wd_heading: 'Work Done', wd_sub: 'Kemajuan kerja (target vs actual) bagi setiap PO',
    search_placeholder_wd: 'Cari Contract No / Project Name / PMT...',
    opt_allpmt: '-- Semua PMT --', opt_allcontract: '-- Semua Contract --',
    wd_th_target: 'Work Done Target', wd_th_actual: 'Work Done Actual', wd_th_totalpo: 'Total PO',
    wd_th_totalactual: 'Total Actual', wd_th_balance: 'Balance',
    wd_empty: 'Tiada PO aktif. Tambah PO di page PO Tracking dahulu.',
    wd_modal_add: 'Tambah Update Work Done', wd_modal_edit: 'Kemaskini Update Work Done',
    wd_history_title: 'Sejarah Work Done',
    fld_selectpo: 'Pilih PO / Projek', fld_target: 'Work Done Target (RM)', fld_actual: 'Work Done Actual (RM)',
    fld_period: 'Tempoh (Bulan)',
    err_po_required: 'Sila pilih PO / Projek',
    toast_wd_saved: 'Update Work Done disimpan', toast_wd_deleted: 'Rekod dipadam',
    toast_auto_complete: 'Projek "{name}" telah mencapai 100% dan ditandakan selesai secara automatik',
    confirm_delete_wd: 'Padam rekod update ini?',
    wd_no_entries: 'Tiada update lagi untuk PO ini.',
    wd_skipped_title: '{n} baris dilangkau (Contract No / PO Number tidak dijumpai dalam sistem):',

    /* Page 4 Permit */
    permit_heading: 'Permit Tracking', permit_sub: 'Status permohonan permit mengikut projek',
    search_placeholder_permit: 'Cari Contract No / Project Name / Submission Ref...',
    btn_addpermit: '+ Tambah Permit',
    fld_projecttype: 'Project (11kV/33kV/Other)', fld_code: 'Code (HDD/OC/CL/JT)',
    fld_submissionref: 'Submission Ref. No.', fld_submissiondate: 'Submission Date', fld_owner: 'Owner (PBT/Developer/Utilities)',
    fld_statuspermit: 'Status Permit', fld_targetstart: 'Target To Start Work',
    fld_permitstart: 'Permit Start', fld_permitend: 'Permit End', fld_actionremark: 'Action Remark',
    permit_th_projecttype: 'Project', permit_th_code: 'Code', permit_th_submissionref: 'Submission Ref.No.', permit_th_submissiondate: 'Submission Date',
    permit_th_owner: 'Owner', permit_th_statuspermit: 'Status Permit', permit_th_targetstart: 'Target To Start Work',
    permit_th_permitstart: 'Permit Start', permit_th_permitend: 'Permit End', permit_th_countdown: 'Countdown (hari)',
    permit_th_actionremark: 'Action Remark',
    permit_empty: 'Tiada rekod permit lagi.',
    permit_modal_add: 'Tambah Permit', permit_modal_edit: 'Kemaskini Permit',
    status_pending: 'Belum Mohon', status_submitted: 'Dihantar', status_in_progress: 'Dalam Proses',
    status_approved: 'Diluluskan', status_rejected: 'Ditolak', status_expired: 'Tamat Tempoh',
    opt_owner_pbt: 'PBT', opt_owner_developer: 'Developer', opt_owner_utilities: 'Utilities',
    opt_11kv: '11kV', opt_33kv: '33kV', opt_other: 'Other',
    toast_permit_saved: 'Permit disimpan', toast_permit_deleted: 'Permit dipadam',
    confirm_delete_permit: 'Padam rekod permit ini?',
    countdown_expired: 'Tamat {n} hari lalu',

    /* Page 5 Complete */
    complete_heading: 'Project Completed', complete_sub: 'Projek yang telah mencapai 100% Work Done',
    complete_edit_title: 'Kemaskini Maklumat Projek Selesai',
    complete_th_projecttype: 'Project', complete_th_code: 'Code', complete_th_submissionref: 'Submission Ref.No.',
    complete_th_owner: 'Owner', complete_th_actionremark: 'Action Remark',
    complete_empty: 'Tiada projek selesai lagi.',

    /* Page 6 Collection */
    collection_heading: 'Collection Target', collection_sub: 'Sasaran kutipan dan invois mengikut cawangan',
    btn_addcollection: '+ Tambah Cawangan',
    fld_targetamount: 'Target (RM)', fld_totalinvoice: 'Total Invoice (RM)',
    fld_odutil: 'OD Utilization', fld_creditors: 'Creditors Outstanding (RM)',
    collection_th_branch: 'Branch', collection_th_target: 'Target (RM)', collection_th_invoice: 'Total Invoice (RM)',
    collection_th_achieved: 'Invoiced Achieved (%)', collection_th_od: 'OD Utilization', collection_th_creditors: 'Creditors Outstanding',
    collection_th_filter: 'Pilih',
    collection_filtered_title: 'Jumlah Ikut Cawangan Dipilih', collection_filtered_all: 'Semua cawangan (tiada tanda)',
    btn_clearfilter: 'Kosongkan Pilihan',
    collection_empty: 'Tiada data cawangan lagi.',
    collection_grandtotal: 'JUMLAH KESELURUHAN',
    collection_summary_title: 'OD Utilization & Creditors Outstanding (Keseluruhan)',
    collection_asof: 'Sehingga {date}', fld_asofdate: 'Sehingga Tarikh',
    collection_modal_add: 'Tambah Cawangan', collection_modal_edit: 'Kemaskini Cawangan',
    err_branch_required: 'Branch wajib diisi', err_branch_exists: 'Branch ini sudah wujud',
    toast_collection_saved: 'Data cawangan disimpan', toast_collection_deleted: 'Data cawangan dipadam',
    confirm_delete_collection: 'Padam data cawangan ini?',

    toast_import_done: 'Import selesai: {added} baris baharu, {updated} dikemaskini',
    toast_export_empty: 'Tiada data untuk export',
    toast_excel_empty: 'Fail Excel kosong', toast_excel_error: 'Gagal baca fail Excel: ',
    toast_backup_downloaded: 'Backup dimuat turun', toast_backup_uploaded: 'Backup berjaya dimuat naik',
    toast_backup_invalid: 'Fail backup tidak sah', toast_data_cleared: 'Semua data telah dipadam',
    confirm_merge: 'Tekan OK untuk GABUNG (merge) dengan data sedia ada, atau Cancel untuk GANTI (replace) semua data sedia ada.',
    confirm_clearall: 'Padam SEMUA data dalam sistem ini? Tindakan ini tidak boleh dibatalkan. Sila backup dahulu jika perlu.',

    overlap_heading: 'PO Bertindih', overlap_sub: 'PO Number yang wujud lebih daripada sekali dalam sistem — semak dan selesaikan konflik',
    overlap_empty: 'Tiada PO bertindih dijumpai. Semua PO Number adalah unik.',
    overlap_group_title: 'PO Number: {po}', overlap_group_sub: '{n} rekod menggunakan PO Number yang sama',

    admin_heading: 'Admin', admin_sub: 'Setup emel setiap cawangan / PIC untuk keperluan notifikasi masa hadapan',
    admin_hint: 'Emel di sini akan digunakan untuk automasi notifikasi (cth: peringatan kontrak tamat tempoh, update progress mingguan) apabila sistem backend disediakan.',
    admin_th_pic: 'PIC Name', admin_th_email: 'Email', admin_empty: 'Tiada kenalan cawangan ditambah lagi.',
    admin_modal_add: 'Tambah Kenalan', admin_modal_edit: 'Kemaskini Kenalan', btn_addcontact: '+ Tambah Kenalan',
    err_admin_required: 'Branch dan Email wajib diisi',
    toast_admin_saved: 'Kenalan disimpan', toast_admin_deleted: 'Kenalan dipadam',
    confirm_delete_admin: 'Padam kenalan ini?'
  },
  en: {
    appTagline: 'Contract Tracking System',
    nav_contract: 'Contract', nav_po: 'PO Tracking', nav_workdone: 'Work Done',
    nav_permit: 'Permit Tracking', nav_complete: 'Project Completed', nav_collection: 'Collection Target',
    nav_overlap: 'Overlapping PO', nav_admin: 'Admin',
    sidebar_foot: 'Data is stored locally in this browser. Please backup regularly.',
    btn_backup: 'Backup Data', btn_uploadbackup: 'Upload Backup',
    title_contract: 'Contract', title_po: 'PO Tracking', title_workdone: 'Work Done',
    title_permit: 'Permit Tracking', title_complete: 'Project Completed', title_collection: 'Collection Target',
    title_overlap: 'Overlapping PO', title_admin: 'Admin',

    btn_template: 'Download Template', btn_upload: 'Upload Excel', btn_export: 'Export',
    btn_cancel: 'Cancel', btn_save: 'Save', btn_close: 'Close', btn_delete: 'Delete',
    action_edit: 'Edit', action_delete: 'Delete', action_complete: 'Complete', action_reopen: 'Reopen',
    action_history: 'History', action_addupdate: '+ Update',
    import_result_title: 'Import Result',

    th_contractno: 'Contract No', th_area: 'Area', th_company: 'Company', th_branch: 'Branch',
    th_ceiling: 'Contract Value', th_totalpo: 'Total PO', th_variance: 'Balance / Excess', th_util: 'Utilization',
    th_status: 'Status', th_progress: 'Progress (%)', th_guarantee: 'BD / BG', th_dateupdate: 'Date Update',

    /* Page 1 Contract */
    contract_heading: 'Contract', contract_sub: 'List of bulk contracts, ceilings, and bank guarantees (BD/BG)',
    alert_overbudget_title: '{n} contract(s) exceeded the contract value (over budget)',
    lbl_po: 'PO', lbl_ceiling: 'Contract Value', lbl_vs: 'vs', lbl_exceeded: 'exceeded by',
    kpi_contracts: 'Total Contracts', kpi_contracts_sub: '{n} over ceiling',
    kpi_ceiling: 'Contract Value (Total)',
    kpi_po: 'Total PO Issued', kpi_po_sub: '{n} PO',
    kpi_actual: 'Total Work Done Actual',
    kpi_balance: 'Balance Not Yet Done',
    kpi_pofull: 'PO Full (Total)', kpi_poclaim: 'PO Claim', kpi_polbalance: 'Balance to Claim',
    btn_addcontract: '+ Add Contract',
    status_notset: 'Not set', status_over: 'Over Ceiling', status_nosiling: 'No Ceiling', status_ok: 'OK',
    bu_title: 'PO by Branch', bu_sub: 'Top 10 by PO amount',
    bu_empty: 'No data yet.', bu_none: '(No Branch)',
    contract_empty: 'No contracts yet. Add or upload a contract to get started.',
    contract_form_add: 'Add Contract', contract_form_edit: 'Update Contract',
    fld_contractno: 'Contract No *', fld_contractvalue: 'Contract Value (RM)', fld_area: 'Area',
    fld_startdate: 'Start Date', fld_enddate: 'End Date', fld_company: 'Company', fld_branch: 'Branch',
    fld_guaranteetype: 'Bank (BD) / Bank Guarantee (BG)', fld_guaranteeamount: 'Amount BD / BG (RM)',
    fld_guaranteestart: 'Start Date (BD/BG)', fld_guaranteeend: 'End Date (BD/BG)',
    opt_bd: 'BD', opt_bg: 'BG', opt_none: '--',
    err_contractno_required: 'Contract No is required', err_contract_exists: 'This Contract No already exists',
    err_contract_haspo: 'Cannot delete — this contract still has POs linked to it. Delete/reassign those POs first.',
    toast_contract_saved: 'Contract saved', toast_contract_deleted: 'Contract deleted',
    confirm_delete_contract: 'Delete this contract?',

    /* Page 2 PO Tracking */
    po_heading: 'PO Tracking', po_sub: 'List of POs across all branches under each bulk contract',
    search_placeholder_po: 'Search Contract No / Project Name / PO Number / PIC...',
    search_placeholder_contract: 'Search Contract No / Area / Company / Branch...',
    btn_addpo: '+ Add PO',
    fld_displayname: 'Project Name', fld_ponumber: 'PO Number *', fld_poamount: 'PO Amount *',
    fld_podate: 'Date PO', fld_saidi: 'SAIDI', fld_pmt: 'PMT', fld_ps: 'Project Secretary (PS)',
    fld_remark: 'Remarks', fld_pic: 'PIC Name',
    po_th_displayname: 'Project Name', po_th_ponumber: 'PO Number', po_th_poamount: 'PO Amount',
    po_th_podate: 'Date PO', po_th_saidi: 'SAIDI', po_th_permitstatus: 'Permit Status', po_th_pmt: 'PMT',
    po_th_ps: 'PS', po_th_remark: 'Remarks', po_th_pic: 'PIC Name',
    po_th_claimamount: 'Claim Amount', po_th_claimdate: 'Claim Date', po_th_balance: 'Balance to Claim',
    po_empty: 'No PO records. Upload Excel or add a new PO.',
    po_modal_add: 'Add PO', po_modal_edit: 'Update PO',
    hint_po: 'Permit Status updates automatically from Permit Tracking. Progress is calculated automatically from Work Done.',
    err_no_contracts_yet: 'No contracts in the system yet. Please add a contract on the Contract page first.',
    err_contract_notfound: 'This Contract No does not exist yet. Please add the contract first on the Contract page.',
    toast_po_required: 'Contract No and PO Number are required',
    toast_po_saved: 'PO saved', toast_po_deleted: 'PO deleted',
    toast_po_completed: 'Project marked as complete', toast_po_reopened: 'Project reopened',
    confirm_delete_po: 'Delete this PO record?',
    permit_none: 'No Permit',

    /* Page 3 Work Done */
    wd_heading: 'Work Done', wd_sub: 'Work progress (target vs actual) for each PO',
    search_placeholder_wd: 'Search Contract No / Project Name / PMT...',
    opt_allpmt: '-- All PMT --', opt_allcontract: '-- All Contract --',
    wd_th_target: 'Work Done Target', wd_th_actual: 'Work Done Actual', wd_th_totalpo: 'Total PO',
    wd_th_totalactual: 'Total Actual', wd_th_balance: 'Balance',
    wd_empty: 'No active POs. Add a PO on the PO Tracking page first.',
    wd_modal_add: 'Add Work Done Update', wd_modal_edit: 'Update Work Done Entry',
    wd_history_title: 'Work Done History',
    fld_selectpo: 'Select PO / Project', fld_target: 'Work Done Target (RM)', fld_actual: 'Work Done Actual (RM)',
    fld_period: 'Period (Month)',
    err_po_required: 'Please select a PO / Project',
    toast_wd_saved: 'Work Done update saved', toast_wd_deleted: 'Record deleted',
    toast_auto_complete: 'Project "{name}" has reached 100% and was automatically marked complete',
    confirm_delete_wd: 'Delete this update record?',
    wd_no_entries: 'No updates yet for this PO.',
    wd_skipped_title: '{n} row(s) skipped (Contract No / PO Number not found in the system):',

    /* Page 4 Permit */
    permit_heading: 'Permit Tracking', permit_sub: 'Permit application status by project',
    search_placeholder_permit: 'Search Contract No / Project Name / Submission Ref...',
    btn_addpermit: '+ Add Permit',
    fld_projecttype: 'Project (11kV/33kV/Other)', fld_code: 'Code (HDD/OC/CL/JT)',
    fld_submissionref: 'Submission Ref. No.', fld_submissiondate: 'Submission Date', fld_owner: 'Owner (PBT/Developer/Utilities)',
    fld_statuspermit: 'Status Permit', fld_targetstart: 'Target To Start Work',
    fld_permitstart: 'Permit Start', fld_permitend: 'Permit End', fld_actionremark: 'Action Remark',
    permit_th_projecttype: 'Project', permit_th_code: 'Code', permit_th_submissionref: 'Submission Ref.No.', permit_th_submissiondate: 'Submission Date',
    permit_th_owner: 'Owner', permit_th_statuspermit: 'Status Permit', permit_th_targetstart: 'Target To Start Work',
    permit_th_permitstart: 'Permit Start', permit_th_permitend: 'Permit End', permit_th_countdown: 'Countdown (days)',
    permit_th_actionremark: 'Action Remark',
    permit_empty: 'No permit records yet.',
    permit_modal_add: 'Add Permit', permit_modal_edit: 'Update Permit',
    status_pending: 'Not Applied', status_submitted: 'Submitted', status_in_progress: 'In Progress',
    status_approved: 'Approved', status_rejected: 'Rejected', status_expired: 'Expired',
    opt_owner_pbt: 'PBT', opt_owner_developer: 'Developer', opt_owner_utilities: 'Utilities',
    opt_11kv: '11kV', opt_33kv: '33kV', opt_other: 'Other',
    toast_permit_saved: 'Permit saved', toast_permit_deleted: 'Permit deleted',
    confirm_delete_permit: 'Delete this permit record?',
    countdown_expired: 'Expired {n} days ago',

    /* Page 5 Complete */
    complete_heading: 'Project Completed', complete_sub: 'Projects that have reached 100% Work Done',
    complete_edit_title: 'Update Completed Project Info',
    complete_th_projecttype: 'Project', complete_th_code: 'Code', complete_th_submissionref: 'Submission Ref.No.',
    complete_th_owner: 'Owner', complete_th_actionremark: 'Action Remark',
    complete_empty: 'No completed projects yet.',

    /* Page 6 Collection */
    collection_heading: 'Collection Target', collection_sub: 'Collection and invoicing targets by branch',
    btn_addcollection: '+ Add Branch',
    fld_targetamount: 'Target (RM)', fld_totalinvoice: 'Total Invoice (RM)',
    fld_odutil: 'OD Utilization', fld_creditors: 'Creditors Outstanding (RM)',
    collection_th_branch: 'Branch', collection_th_target: 'Target (RM)', collection_th_invoice: 'Total Invoice (RM)',
    collection_th_achieved: 'Invoiced Achieved (%)', collection_th_od: 'OD Utilization', collection_th_creditors: 'Creditors Outstanding',
    collection_th_filter: 'Select',
    collection_filtered_title: 'Totals by Selected Branch', collection_filtered_all: 'All branches (none ticked)',
    btn_clearfilter: 'Clear Selection',
    collection_empty: 'No branch data yet.',
    collection_grandtotal: 'GRAND TOTAL',
    collection_summary_title: 'OD Utilization & Creditors Outstanding (Overall)',
    collection_asof: 'As of {date}', fld_asofdate: 'As Of Date',
    collection_modal_add: 'Add Branch', collection_modal_edit: 'Update Branch',
    err_branch_required: 'Branch is required', err_branch_exists: 'This Branch already exists',
    toast_collection_saved: 'Branch data saved', toast_collection_deleted: 'Branch data deleted',
    confirm_delete_collection: 'Delete this branch data?',

    toast_import_done: 'Import complete: {added} new rows, {updated} updated',
    toast_export_empty: 'No data to export',
    toast_excel_empty: 'Excel file is empty', toast_excel_error: 'Failed to read Excel file: ',
    toast_backup_downloaded: 'Backup downloaded', toast_backup_uploaded: 'Backup uploaded successfully',
    toast_backup_invalid: 'Invalid backup file', toast_data_cleared: 'All data has been cleared',
    confirm_merge: 'Press OK to MERGE with existing data, or Cancel to REPLACE all existing data.',
    confirm_clearall: 'Delete ALL data in this system? This action cannot be undone. Please backup first if needed.',

    overlap_heading: 'Overlapping PO', overlap_sub: 'PO Numbers that appear more than once in the system — review and resolve conflicts',
    overlap_empty: 'No overlapping POs found. All PO Numbers are unique.',
    overlap_group_title: 'PO Number: {po}', overlap_group_sub: '{n} records use this same PO Number',

    admin_heading: 'Admin', admin_sub: 'Set up branch / PIC emails for future notification needs',
    admin_hint: 'Emails here will be used for future notification automation (e.g. expired contract reminders, weekly progress update requests) once the backend is set up.',
    admin_th_pic: 'PIC Name', admin_th_email: 'Email', admin_empty: 'No branch contacts added yet.',
    admin_modal_add: 'Add Contact', admin_modal_edit: 'Update Contact', btn_addcontact: '+ Add Contact',
    err_admin_required: 'Branch and Email are required',
    toast_admin_saved: 'Contact saved', toast_admin_deleted: 'Contact deleted',
    confirm_delete_admin: 'Delete this contact?'
  }
};
let lang = localStorage.getItem(LANG_KEY) || 'ms';
function t(key, vars){
  let s = (I18N[lang] && I18N[lang][key]) || key;
  if(vars) Object.entries(vars).forEach(([k,v]) => { s = s.replace('{'+k+'}', v); });
  return s;
}
function toggleLang(){
  lang = lang === 'ms' ? 'en' : 'ms';
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  applyStaticI18n();
  renderAll();
}
function applyStaticI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.getElementById('langToggle').textContent = lang === 'ms' ? 'EN' : 'BM';
  document.getElementById('topTitle').textContent = t('title_' + currentPage());
}

/* ===================== Utils ===================== */
function uid(){ return 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function num(v){ const n = parseFloat(String(v).replace(/[^0-9.\-]/g,'')); return isNaN(n) ? 0 : n; }
function fmtMoney(v){ return 'RM ' + num(v).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function fmtNum(v){ return num(v).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function fmtDate(v){
  if(!v) return '-';
  const d = new Date(v);
  if(isNaN(d)) return v;
  return d.toLocaleDateString(lang==='ms' ? 'ms-MY' : 'en-GB',{day:'2-digit',month:'short',year:'numeric'});
}
function toISODate(v){
  if(!v) return '';
  if(v instanceof Date) return v.toISOString().slice(0,10);
  if(typeof v === 'number'){
    const d = XLSX.SSF.parse_date_code(v);
    if(d) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`;
  }
  const s = String(v).trim();
  const d = new Date(s);
  if(!isNaN(d) && /\d{4}/.test(s)) return d.toISOString().slice(0,10);
  return s;
}
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

/* ===================== Icons ===================== */
const ICONS = {
  contract: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>',
  po: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
  activity: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 5-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  banknote: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10h.01M18 14h.01"/></svg>',
  target: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none"/></svg>',
  warning: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.01"/></svg>',
  upload: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  sun: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>'
};
function icon(name){ return ICONS[name] || ''; }
function toast(msg, type){
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' '+type : '');
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.remove(); }, 3200);
}
function normHeader(h){ return String(h||'').trim().toLowerCase().replace(/\s+/g,' '); }
function mapRow(row, fieldMap){
  const normRow = {};
  Object.keys(row).forEach(k => { normRow[normHeader(k)] = row[k]; });
  const out = {};
  Object.entries(fieldMap).forEach(([field, variants]) => {
    for(const v of variants){
      if(normRow[v] !== undefined && normRow[v] !== ''){ out[field] = normRow[v]; return; }
    }
    out[field] = '';
  });
  return out;
}

/* ===================== Domain constants ===================== */
const PERMIT_STATUS_OPTIONS = ['pending','submitted','in_progress','approved','rejected','expired'];
const PERMIT_STATUS_PROGRESS = {pending:0, submitted:20, in_progress:50, approved:100, rejected:0, expired:0};
const PERMIT_STATUS_RANK = {rejected:0, expired:1, pending:2, submitted:3, in_progress:4, approved:5};
const PERMIT_STATUS_PILL = {pending:'grey', submitted:'warn', in_progress:'warn', approved:'ok', rejected:'bad', expired:'bad'};
const OWNER_OPTIONS = ['pbt','developer','utilities'];
const PROJECT_TYPE_OPTIONS = ['11kv','33kv','other'];
const MONTH_MAP = [
  {en:'january', ms:'januari', num:1}, {en:'february', ms:'februari', num:2},
  {en:'march', ms:'mac', num:3}, {en:'april', ms:'april', num:4},
  {en:'may', ms:'mei', num:5}, {en:'june', ms:'jun', num:6},
  {en:'july', ms:'julai', num:7}, {en:'august', ms:'ogos', num:8},
  {en:'september', ms:'september', num:9}, {en:'october', ms:'oktober', num:10},
  {en:'november', ms:'november', num:11}, {en:'december', ms:'disember', num:12}
];

/* ===================== Column mapping (Excel import) ===================== */
const CONTRACT_FIELD_MAP = {
  contractNo: ['contract no','contractno','contract number','no kontrak'],
  contractAmount: ['contract value','contract amount','nilai kontrak','siling kontrak','contract ceiling'],
  area: ['area','kawasan'],
  startDate: ['start date','tarikh mula','startdate'],
  endDate: ['end date','tarikh akhir','enddate'],
  guaranteeType: ['bank (bd) / bank guarantee (bg)','bd/bg','guarantee type'],
  guaranteeAmount: ['amount bd / bg','amount bd/bg','bd/bg amount'],
  guaranteeStartDate: ['start date (bd/bg)','bd/bg start date'],
  guaranteeEndDate: ['end date (bd/bg)','bd/bg end date'],
  company: ['company','syarikat'],
  branch: ['branch','cawangan','branches involved','cawangan terlibat']
};
const PO_FIELD_MAP = {
  contractNo: ['contract no','contractno','contract number','no kontrak','no. kontrak'],
  displayName: ['project name','display name','nama projek','displayname'],
  poNumber: ['po number','po no','ponumber','no po','po num'],
  poAmount: ['po amount','amount po','jumlah po','poamount'],
  poDate: ['date po','po date','tarikh po','podate'],
  saidi: ['saidi'],
  pmt: ['pmt','project manager team'],
  projectSecretary: ['ps','project secretary','projectsecretary','setiausaha projek'],
  remark: ['remarks','remark','catatan'],
  pic: ['pic name','pic','pegawai bertanggungjawab'],
  claimAmount: ['claim amount','jumlah claim','jumlah tuntutan'],
  claimDate: ['claim date','tarikh claim']
};
const PERMIT_FIELD_MAP = {
  contractNo: ['contract no','contractno','no kontrak'],
  displayName: ['project name','display name'],
  company: ['company','syarikat'],
  branch: ['branch','cawangan'],
  area: ['area','kawasan'],
  projectType: ['project (11kv/33kv/other)','project type','project'],
  code: ['code (hdd/oc/cl/jt)','code'],
  submissionRefNo: ['submission ref.no.','submission ref no','submission ref','ref no'],
  submissionDate: ['submission date','tarikh hantar'],
  owner: ['owner (pbt/developer/utilities)','owner'],
  statusPermit: ['status permit','status'],
  targetToStartWork: ['target to start work'],
  permitStart: ['permit start'],
  permitEnd: ['permit end'],
  pic: ['pic name','pic'],
  actionRemark: ['action remark','remark','remarks']
};
const COLLECTION_FIELD_MAP = {
  branch: ['cawangan','branch'],
  targetAmount: ['target (rm)','target'],
  totalInvoice: ['total invoice (rm)','total invoice']
};
const ADMIN_FIELD_MAP = {
  branch: ['branch','cawangan'],
  picName: ['pic name','pic'],
  email: ['email','e-mail']
};

/* ===================== Computed helpers ===================== */
function poWorkDoneEntries(poId){ return state.workDone.filter(w => w.poId === poId); }
function poActualTotal(poId){ return poWorkDoneEntries(poId).reduce((s,w)=>s+num(w.actual),0); }
function poLatestEntry(poId){
  const entries = poWorkDoneEntries(poId);
  if(entries.length===0) return null;
  return entries.slice().sort((a,b)=> (a.period||'').localeCompare(b.period||'') || (a.dateUpdate||'').localeCompare(b.dateUpdate||'')).pop();
}
function poProgress(po){
  if(!po || num(po.poAmount)<=0) return null;
  return Math.min(999, poActualTotal(po.id) / num(po.poAmount) * 100);
}
function checkAutoComplete(poId){
  const po = state.purchaseOrders.find(p=>p.id===poId);
  if(!po || po.status==='complete') return;
  const prog = poProgress(po);
  if(prog!==null && prog>=100){
    po.status='complete'; po.dateUpdate=todayISO();
    toast(t('toast_auto_complete',{name:po.displayName||po.poNumber}), 'ok');
  }
}
function contractSummary(){
  return state.contracts.map(c => {
    const pos = state.purchaseOrders.filter(p => p.contractNo === c.contractNo);
    const totalPO = pos.reduce((s,p)=>s+num(p.poAmount),0);
    const totalActual = pos.reduce((s,p)=>s+poActualTotal(p.id),0);
    const variance = num(c.contractAmount) - totalPO;
    const utilization = num(c.contractAmount) > 0 ? (totalPO/num(c.contractAmount)*100) : null;
    const overBudget = num(c.contractAmount) > 0 && totalPO > num(c.contractAmount);
    const progress = totalPO > 0 ? Math.min(999, totalActual/totalPO*100) : null;
    return { ...c, totalPO, totalActual, variance, utilization, overBudget, progress, poCount: pos.length };
  }).sort((a,b) => (b.overBudget - a.overBudget) || (b.totalPO - a.totalPO));
}
function resolvePermitsForProject(contractNo, displayName){
  const cn = String(contractNo||'').trim().toLowerCase();
  const dn = String(displayName||'').trim().toLowerCase();
  return state.permits.filter(p => String(p.contractNo||'').trim().toLowerCase()===cn && String(p.displayName||'').trim().toLowerCase()===dn);
}
function resolvePermitStatusForPO(po){
  const matches = resolvePermitsForProject(po.contractNo, po.displayName);
  if(matches.length===0) return null;
  let worst = matches[0];
  matches.forEach(m => { if(PERMIT_STATUS_RANK[m.statusPermit] < PERMIT_STATUS_RANK[worst.statusPermit]) worst = m; });
  return { status: worst.statusPermit, count: matches.length };
}
function countdownDays(permitEnd){
  if(!permitEnd) return null;
  const end = new Date(permitEnd);
  if(isNaN(end)) return null;
  const today = new Date(todayISO());
  return Math.round((end-today)/86400000);
}
function permitStatusLabel(key){ return key ? t('status_'+key) : '-'; }

/* ===================== Router ===================== */
const PAGES = ['contract','po','workdone','permit','complete','collection','overlap','admin'];
function go(page){
  if(!PAGES.includes(page)) page = 'contract';
  document.querySelectorAll('.nav-item, .bnav-item').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  document.querySelectorAll('.page').forEach(el => el.classList.toggle('active', el.id==='page-'+page));
  document.getElementById('topTitle').textContent = t('title_' + page);
  location.hash = page;
  renderPage(page);
}
function renderPage(page){
  if(page==='contract') renderContract();
  else if(page==='po') renderPO();
  else if(page==='workdone') renderWorkDone();
  else if(page==='permit') renderPermit();
  else if(page==='complete') renderComplete();
  else if(page==='collection') renderCollection();
  else if(page==='overlap') renderOverlap();
  else if(page==='admin') renderAdmin();
}
function renderAll(){ renderNavBadges(); renderPage(currentPage()); }
function currentPage(){
  const h = location.hash.replace('#','');
  return PAGES.includes(h) ? h : 'contract';
}
function duplicatePoGroups(){
  const map = {};
  state.purchaseOrders.forEach(p => {
    const key = String(p.poNumber||'').trim().toLowerCase();
    if(!key) return;
    (map[key] = map[key] || []).push(p);
  });
  return Object.values(map).filter(g => g.length > 1);
}
function renderNavBadges(){
  const overCount = contractSummary().filter(c=>c.overBudget).length;
  const badge = document.getElementById('navBadgeDash');
  if(overCount>0){ badge.textContent = overCount; badge.style.display='inline-block'; }
  else badge.style.display='none';
  const dupCount = duplicatePoGroups().length;
  const dupBadge = document.getElementById('navBadgeOverlap');
  if(dupCount>0){ dupBadge.textContent = dupCount; dupBadge.style.display='inline-block'; }
  else dupBadge.style.display='none';
}

/* ===================== PAGE 1: CONTRACT ===================== */
let contractFilter = '';
function renderContract(){
  const el = document.getElementById('page-contract');
  const fullSummary = contractSummary();
  const totalCeiling = fullSummary.reduce((s,c)=>s+num(c.contractAmount),0);
  const totalPO = fullSummary.reduce((s,c)=>s+c.totalPO,0);
  const totalActual = fullSummary.reduce((s,c)=>s+c.totalActual,0);
  const totalBalance = totalPO - totalActual;
  const overList = fullSummary.filter(c=>c.overBudget);
  const summary = fullSummary.filter(c => {
    if(!contractFilter) return true;
    const q = contractFilter.toLowerCase();
    return [c.contractNo,c.area,c.company,c.branch].some(v => String(v||'').toLowerCase().includes(q));
  });

  const brMap = {};
  state.purchaseOrders.forEach(p => {
    const c = state.contracts.find(x=>x.contractNo===p.contractNo);
    const key = (c && c.branch) ? c.branch : t('bu_none');
    brMap[key] = (brMap[key]||0) + num(p.poAmount);
  });
  const brEntries = Object.entries(brMap).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const maxBr = Math.max(1, ...brEntries.map(e=>e[1]));

  el.innerHTML = `
    <div class="pagehead">
      <h2>${t('contract_heading')}</h2>
      <p>${t('contract_sub')}</p>
    </div>

    ${overList.length ? `
    <div class="alert danger">
      <div class="ic">${icon('warning')}</div>
      <div>
        <b>${t('alert_overbudget_title',{n:overList.length})}</b><br>
        ${overList.map(c=>`${esc(c.contractNo)} &mdash; ${t('lbl_po')}: ${fmtMoney(c.totalPO)} ${t('lbl_vs')} ${t('lbl_ceiling')}: ${fmtMoney(c.contractAmount)} (${t('lbl_exceeded')} ${fmtMoney(Math.abs(c.variance))})`).join('<br>')}
      </div>
    </div>` : ''}

    <div class="grid-kpi">
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--blue-bg);color:var(--blue)">${icon('contract')}</div><div class="lbl">${t('kpi_contracts')}</div></div>
        <div class="num">${summary.length}</div><div class="sub">${t('kpi_contracts_sub',{n:overList.length})}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--accent-soft);color:var(--accent2)">${icon('target')}</div><div class="lbl">${t('kpi_ceiling')}</div></div>
        <div class="num">${fmtMoney(totalCeiling)}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--amber-bg);color:var(--amber)">${icon('po')}</div><div class="lbl">${t('kpi_po')}</div></div>
        <div class="num">${fmtMoney(totalPO)}</div><div class="sub">${t('kpi_po_sub',{n:state.purchaseOrders.length})}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--green-bg);color:var(--green)">${icon('checkCircle')}</div><div class="lbl">${t('kpi_actual')}</div></div>
        <div class="num">${fmtMoney(totalActual)}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--grey-bg);color:var(--muted)">${icon('clock')}</div><div class="lbl">${t('kpi_balance')}</div></div>
        <div class="num">${fmtMoney(totalBalance)}</div></div>
    </div>

    <div class="card">
      <div class="toolbar">
        <input type="text" id="contractSearch" placeholder="${esc(t('search_placeholder_contract'))}" value="${esc(contractFilter)}" oninput="contractFilter=this.value; renderContract();">
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('contract')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('contractFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="contractFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'contract')">
        <button class="icon-btn" onclick="exportSheet(state.contracts,'Contract')">${icon('download')} ${t('btn_export')}</button>
        <button class="icon-btn primary" onclick="openContractModal()">${t('btn_addcontract')}</button>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>${t('th_contractno')}</th><th>${t('th_area')}</th><th>${t('th_company')}</th><th>${t('th_branch')}</th>
            <th>${t('th_ceiling')}</th><th>${t('th_totalpo')}</th><th>${t('th_variance')}</th><th>${t('th_util')}</th>
            <th>${t('th_guarantee')}</th><th>${t('th_progress')}</th><th>${t('th_status')}</th><th></th>
          </tr></thead>
          <tbody>
            ${summary.length===0 ? `<tr class="empty-row"><td colspan="12">${t('contract_empty')}</td></tr>` :
              summary.map(c => `
              <tr class="${c.overBudget?'over':''}">
                <td data-label="${esc(t('th_contractno'))}"><b>${esc(c.contractNo)}</b></td>
                <td data-label="${esc(t('th_area'))}">${esc(c.area||'-')}</td>
                <td data-label="${esc(t('th_company'))}">${esc(c.company||'-')}</td>
                <td data-label="${esc(t('th_branch'))}">${esc(c.branch||'-')}</td>
                <td data-label="${esc(t('th_ceiling'))}">${num(c.contractAmount)>0?fmtMoney(c.contractAmount):`<span class="pill grey">${t('status_notset')}</span>`}</td>
                <td data-label="${esc(t('th_totalpo'))}">${fmtMoney(c.totalPO)}</td>
                <td data-label="${esc(t('th_variance'))}" style="color:${c.variance<0?'var(--red)':'var(--text)'}">${num(c.contractAmount)>0?fmtMoney(c.variance):'-'}</td>
                <td data-label="${esc(t('th_util'))}">${c.utilization!=null ? c.utilization.toFixed(0)+'%' : '-'}</td>
                <td data-label="${esc(t('th_guarantee'))}">${c.guaranteeType ? `${esc(c.guaranteeType)} ${fmtMoney(c.guaranteeAmount)}<br><span style="color:var(--muted);font-size:10.5px">${fmtDate(c.guaranteeEndDate)}</span>` : '-'}</td>
                <td data-label="${esc(t('th_progress'))}">${c.progress!=null ? c.progress.toFixed(0)+'%' : '-'}</td>
                <td data-label="${esc(t('th_status'))}">${c.overBudget ? `<span class="pill bad">${t('status_over')}</span>` : (num(c.contractAmount)===0 ? `<span class="pill grey">${t('status_nosiling')}</span>` : `<span class="pill ok">${t('status_ok')}</span>`)}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openContractModal('${c.id}')">${t('action_edit')}</button>
                  <button class="danger" onclick="deleteContract('${c.id}')">${t('action_delete')}</button>
                </div></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="chead"><div><h3>${t('bu_title')}</h3><p>${t('bu_sub')}</p></div></div>
      ${brEntries.length===0 ? `<p class="hint">${t('bu_empty')}</p>` : brEntries.map(([br,amt]) => `
        <div class="barrow">
          <div class="blabel" title="${esc(br)}">${esc(br)}</div>
          <div class="btrack"><div class="bfill" style="width:${(amt/maxBr*100).toFixed(1)}%"></div></div>
          <div class="bval">${fmtMoney(amt)}</div>
        </div>`).join('')}
    </div>
  `;
}
function openContractModal(id){
  const c = id ? state.contracts.find(x=>x.id===id) : {};
  const isEdit = !!id;
  openModal(`
    <h3>${isEdit?t('contract_form_edit'):t('contract_form_add')}</h3>
    <div class="field-grid">
      <div class="field"><label>${t('fld_contractno')}</label><input id="f_contractNo" value="${esc(c.contractNo||'')}" ${isEdit?'disabled':''}></div>
      <div class="field"><label>${t('fld_contractvalue')}</label><input id="f_contractAmount" type="number" step="0.01" value="${c.contractAmount||''}"></div>
      <div class="field"><label>${t('fld_area')}</label><input id="f_area" value="${esc(c.area||'')}"></div>
      <div class="field"><label>${t('fld_startdate')}</label><input id="f_startDate" type="date" value="${toISODate(c.startDate)}"></div>
      <div class="field"><label>${t('fld_enddate')}</label><input id="f_endDate" type="date" value="${toISODate(c.endDate)}"></div>
      <div class="field"><label>${t('fld_company')}</label><input id="f_company" value="${esc(c.company||'')}"></div>
      <div class="field"><label>${t('fld_branch')}</label><input id="f_branch" value="${esc(c.branch||'')}"></div>
      <div class="field"><label>${t('fld_guaranteetype')}</label>
        <select id="f_guaranteeType">
          <option value="" ${!c.guaranteeType?'selected':''}>${t('opt_none')}</option>
          <option value="BD" ${c.guaranteeType==='BD'?'selected':''}>${t('opt_bd')}</option>
          <option value="BG" ${c.guaranteeType==='BG'?'selected':''}>${t('opt_bg')}</option>
        </select>
      </div>
      <div class="field"><label>${t('fld_guaranteeamount')}</label><input id="f_guaranteeAmount" type="number" step="0.01" value="${c.guaranteeAmount||''}"></div>
      <div class="field"><label>${t('fld_guaranteestart')}</label><input id="f_guaranteeStartDate" type="date" value="${toISODate(c.guaranteeStartDate)}"></div>
      <div class="field"><label>${t('fld_guaranteeend')}</label><input id="f_guaranteeEndDate" type="date" value="${toISODate(c.guaranteeEndDate)}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveContract('${id||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function saveContract(id){
  const data = {
    contractAmount: num(document.getElementById('f_contractAmount').value),
    area: document.getElementById('f_area').value.trim(),
    startDate: document.getElementById('f_startDate').value,
    endDate: document.getElementById('f_endDate').value,
    company: document.getElementById('f_company').value.trim(),
    branch: document.getElementById('f_branch').value.trim(),
    guaranteeType: document.getElementById('f_guaranteeType').value,
    guaranteeAmount: num(document.getElementById('f_guaranteeAmount').value),
    guaranteeStartDate: document.getElementById('f_guaranteeStartDate').value,
    guaranteeEndDate: document.getElementById('f_guaranteeEndDate').value,
    dateUpdate: todayISO()
  };
  if(id){
    const c = state.contracts.find(x=>x.id===id);
    Object.assign(c, data);
  } else {
    const contractNo = document.getElementById('f_contractNo').value.trim();
    if(!contractNo){ toast(t('err_contractno_required'), 'err'); return; }
    if(state.contracts.some(c=>c.contractNo===contractNo)){ toast(t('err_contract_exists'), 'err'); return; }
    state.contracts.push({ id: uid(), contractNo, ...data });
  }
  saveState(); closeModal(); renderAll();
  toast(t('toast_contract_saved'), 'ok');
}
function deleteContract(id){
  const c = state.contracts.find(x=>x.id===id);
  if(!c) return;
  if(state.purchaseOrders.some(p=>p.contractNo===c.contractNo)){ toast(t('err_contract_haspo'), 'err'); return; }
  if(!confirm(t('confirm_delete_contract'))) return;
  state.contracts = state.contracts.filter(x=>x.id!==id);
  saveState(); renderAll();
  toast(t('toast_contract_deleted'));
}

/* ===================== PAGE 2: PO TRACKING ===================== */
let poFilter = '';
let poContractFilter = '';
function renderPO(){
  const el = document.getElementById('page-po');
  const activePOs = state.purchaseOrders.filter(p => p.status !== 'complete');
  const rows = activePOs.filter(matchesPoFilter).filter(p => !poContractFilter || p.contractNo===poContractFilter);
  const summary = contractSummary();
  const overSet = new Set(summary.filter(c=>c.overBudget).map(c=>c.contractNo));
  const contractOptionsFilter = [...new Set(activePOs.map(p=>p.contractNo))].sort();

  const poFull = rows.reduce((s,p)=>s+num(p.poAmount),0);
  const poClaim = rows.reduce((s,p)=>s+num(p.claimAmount),0);
  const poBalance = poFull - poClaim;

  el.innerHTML = `
    <div class="pagehead"><h2>${t('po_heading')}</h2><p>${t('po_sub')}</p></div>

    <div class="grid-kpi">
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--amber-bg);color:var(--amber)">${icon('po')}</div><div class="lbl">${t('kpi_pofull')}</div></div>
        <div class="num">${fmtMoney(poFull)}</div><div class="sub">${t('kpi_po_sub',{n:rows.length})}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--green-bg);color:var(--green)">${icon('checkCircle')}</div><div class="lbl">${t('kpi_poclaim')}</div></div>
        <div class="num">${fmtMoney(poClaim)}</div></div>
      <div class="kpi"><div class="top"><div class="chip" style="background:var(--grey-bg);color:var(--muted)">${icon('clock')}</div><div class="lbl">${t('kpi_polbalance')}</div></div>
        <div class="num">${fmtMoney(poBalance)}</div></div>
    </div>

    <div class="card">
      <div class="toolbar">
        <input type="text" id="poSearch" placeholder="${esc(t('search_placeholder_po'))}" value="${esc(poFilter)}" oninput="poFilter=this.value; renderPO();">
        <select id="poContractSelect" onchange="poContractFilter=this.value; renderPO();">
          <option value="">${t('opt_allcontract')}</option>
          ${contractOptionsFilter.map(cn=>`<option value="${esc(cn)}" ${poContractFilter===cn?'selected':''}>${esc(cn)}</option>`).join('')}
        </select>
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('po')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('poFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="poFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'po')">
        <button class="icon-btn" onclick="exportPO()">${icon('download')} ${t('btn_export')}</button>
        <button class="icon-btn primary" onclick="openPOModal()">${t('btn_addpo')}</button>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>${t('th_contractno')}</th><th>${t('po_th_displayname')}</th><th>${t('po_th_ponumber')}</th><th>${t('po_th_poamount')}</th>
            <th>${t('po_th_podate')}</th><th>${t('po_th_saidi')}</th><th>${t('po_th_permitstatus')}</th><th>${t('po_th_pmt')}</th>
            <th>${t('po_th_ps')}</th><th>${t('po_th_claimamount')}</th><th>${t('po_th_claimdate')}</th><th>${t('po_th_balance')}</th>
            <th>${t('po_th_remark')}</th><th>${t('po_th_pic')}</th><th>${t('th_dateupdate')}</th><th>${t('th_progress')}</th><th></th>
          </tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="17">${t('po_empty')}</td></tr>` :
            rows.map(p => {
              const permit = resolvePermitStatusForPO(p);
              const prog = poProgress(p);
              const balance = num(p.poAmount) - num(p.claimAmount);
              return `
              <tr class="${overSet.has(p.contractNo)?'over':''}">
                <td data-label="${esc(t('th_contractno'))}"><b>${esc(p.contractNo)}</b></td>
                <td data-label="${esc(t('po_th_displayname'))}">${esc(p.displayName)}</td>
                <td data-label="${esc(t('po_th_ponumber'))}">${esc(p.poNumber)}</td>
                <td data-label="${esc(t('po_th_poamount'))}">${fmtMoney(p.poAmount)}</td>
                <td data-label="${esc(t('po_th_podate'))}">${fmtDate(p.poDate)}</td>
                <td data-label="${esc(t('po_th_saidi'))}">${esc(p.saidi||'-')}</td>
                <td data-label="${esc(t('po_th_permitstatus'))}">${permit ? `<span class="pill ${PERMIT_STATUS_PILL[permit.status]}">${permitStatusLabel(permit.status)}${permit.count>1?' ('+permit.count+')':''}</span>` : `<span class="pill grey">${t('permit_none')}</span>`}</td>
                <td data-label="${esc(t('po_th_pmt'))}">${esc(p.pmt)}</td>
                <td data-label="${esc(t('po_th_ps'))}">${esc(p.projectSecretary)}</td>
                <td data-label="${esc(t('po_th_claimamount'))}">${fmtMoney(p.claimAmount)}</td>
                <td data-label="${esc(t('po_th_claimdate'))}">${fmtDate(p.claimDate)}</td>
                <td data-label="${esc(t('po_th_balance'))}" style="color:${balance<0?'var(--red)':'var(--text)'}">${fmtMoney(balance)}</td>
                <td data-label="${esc(t('po_th_remark'))}">${esc(p.remark)}</td>
                <td data-label="${esc(t('po_th_pic'))}">${esc(p.pic)}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(p.dateUpdate)}</td>
                <td data-label="${esc(t('th_progress'))}">${prog!=null ? prog.toFixed(0)+'%' : '-'}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openPOModal('${p.id}')">${t('action_edit')}</button>
                  <button class="ok" onclick="markComplete('${p.id}')">${t('action_complete')}</button>
                  <button class="danger" onclick="deletePO('${p.id}')">${t('action_delete')}</button>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function matchesPoFilter(p){
  if(!poFilter) return true;
  const q = poFilter.toLowerCase();
  return [p.contractNo,p.displayName,p.poNumber,p.pic].some(v => String(v||'').toLowerCase().includes(q));
}
function openPOModal(id){
  const p = id ? state.purchaseOrders.find(x=>x.id===id) : {};
  const isEdit = !!id;
  const contractOptions = state.contracts.map(c=>`<option value="${esc(c.contractNo)}" ${p.contractNo===c.contractNo?'selected':''}>${esc(c.contractNo)}${c.area?' — '+esc(c.area):''}</option>`).join('');
  openModal(`
    <h3>${isEdit?t('po_modal_edit'):t('po_modal_add')}</h3>
    ${state.contracts.length===0 ? `<p class="hint" style="color:var(--red);margin-bottom:10px">${t('err_no_contracts_yet')}</p>` : ''}
    <div class="field-grid">
      <div class="field"><label>${t('fld_contractno')}</label>
        <select id="f_contractNo"><option value="">--</option>${contractOptions}</select>
      </div>
      <div class="field"><label>${t('fld_displayname')}</label><input id="f_displayName" value="${esc(p.displayName||'')}"></div>
      <div class="field"><label>${t('fld_ponumber')}</label><input id="f_poNumber" value="${esc(p.poNumber||'')}"></div>
      <div class="field"><label>${t('fld_poamount')}</label><input id="f_poAmount" type="number" step="0.01" value="${p.poAmount||''}"></div>
      <div class="field"><label>${t('fld_podate')}</label><input id="f_poDate" type="date" value="${toISODate(p.poDate)}"></div>
      <div class="field"><label>${t('fld_saidi')}</label><input id="f_saidi" value="${esc(p.saidi||'')}"></div>
      <div class="field"><label>${t('fld_pmt')}</label><input id="f_pmt" value="${esc(p.pmt||'')}"></div>
      <div class="field"><label>${t('fld_ps')}</label><input id="f_projectSecretary" value="${esc(p.projectSecretary||'')}"></div>
      <div class="field"><label>${t('fld_pic')}</label><input id="f_pic" value="${esc(p.pic||'')}"></div>
      <div class="field"><label>${t('po_th_claimamount')}</label><input id="f_claimAmount" type="number" step="0.01" value="${p.claimAmount||''}"></div>
      <div class="field"><label>${t('po_th_claimdate')}</label><input id="f_claimDate" type="date" value="${toISODate(p.claimDate)}"></div>
    </div>
    <div class="field"><label>${t('fld_remark')}</label><textarea id="f_remark">${esc(p.remark||'')}</textarea></div>
    <div class="hint">${t('hint_po')}</div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="savePO('${id||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function savePO(id){
  const contractNo = document.getElementById('f_contractNo').value.trim();
  const poNumber = document.getElementById('f_poNumber').value.trim();
  if(!contractNo || !poNumber){ toast(t('toast_po_required'), 'err'); return; }
  if(!state.contracts.some(c=>c.contractNo===contractNo)){ toast(t('err_contract_notfound'), 'err'); return; }
  const data = {
    contractNo,
    displayName: document.getElementById('f_displayName').value.trim(),
    poNumber,
    poAmount: num(document.getElementById('f_poAmount').value),
    poDate: document.getElementById('f_poDate').value,
    saidi: document.getElementById('f_saidi').value.trim(),
    pmt: document.getElementById('f_pmt').value.trim(),
    projectSecretary: document.getElementById('f_projectSecretary').value.trim(),
    remark: document.getElementById('f_remark').value.trim(),
    pic: document.getElementById('f_pic').value.trim(),
    claimAmount: num(document.getElementById('f_claimAmount').value),
    claimDate: document.getElementById('f_claimDate').value,
    dateUpdate: todayISO()
  };
  if(id){
    const idx = state.purchaseOrders.findIndex(x=>x.id===id);
    state.purchaseOrders[idx] = { ...state.purchaseOrders[idx], ...data };
  } else {
    state.purchaseOrders.push({ id: uid(), status:'active', ...data });
  }
  saveState(); closeModal(); renderAll();
  toast(t('toast_po_saved'), 'ok');
}
function deletePO(id){
  if(!confirm(t('confirm_delete_po'))) return;
  state.purchaseOrders = state.purchaseOrders.filter(x=>x.id!==id);
  state.workDone = state.workDone.filter(w=>w.poId!==id);
  saveState(); renderAll();
  toast(t('toast_po_deleted'));
}
function markComplete(id){
  const p = state.purchaseOrders.find(x=>x.id===id);
  p.status = 'complete'; p.dateUpdate = todayISO();
  saveState(); renderAll();
  toast(t('toast_po_completed'), 'ok');
}
function reopenPO(id){
  const p = state.purchaseOrders.find(x=>x.id===id);
  p.status = 'active'; p.dateUpdate = todayISO();
  saveState(); renderAll();
  toast(t('toast_po_reopened'));
}

/* ===================== PAGE 3: WORK DONE ===================== */
let wdFilter = '';
let wdPmtFilter = '';
function renderWorkDone(){
  const el = document.getElementById('page-workdone');
  const activePOs = state.purchaseOrders.filter(p => p.status !== 'complete');
  const pmtList = [...new Set(activePOs.map(p=>p.pmt).filter(Boolean))].sort();
  const rows = activePOs.filter(p => {
    if(wdPmtFilter && p.pmt !== wdPmtFilter) return false;
    if(!wdFilter) return true;
    const q = wdFilter.toLowerCase();
    return [p.contractNo,p.displayName,p.pmt].some(v => String(v||'').toLowerCase().includes(q));
  });
  el.innerHTML = `
    <div class="pagehead"><h2>${t('wd_heading')}</h2><p>${t('wd_sub')}</p></div>
    <div class="card">
      <div class="toolbar">
        <input type="text" id="wdSearch" placeholder="${esc(t('search_placeholder_wd'))}" value="${esc(wdFilter)}" oninput="wdFilter=this.value; renderWorkDone();">
        <select id="wdPmtSelect" onchange="wdPmtFilter=this.value; renderWorkDone();">
          <option value="">${t('opt_allpmt')}</option>
          ${pmtList.map(p=>`<option value="${esc(p)}" ${wdPmtFilter===p?'selected':''}>${esc(p)}</option>`).join('')}
        </select>
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('workdone')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('wdFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="wdFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'workdone')">
        <button class="icon-btn" onclick="exportWD()">${icon('download')} ${t('btn_export')}</button>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>${t('th_contractno')}</th><th>${t('po_th_displayname')}</th><th>${t('po_th_pmt')}</th><th>${t('po_th_ponumber')}</th>
            <th>${t('wd_th_target')}</th><th>${t('wd_th_actual')}</th><th>${t('wd_th_totalpo')}</th><th>${t('wd_th_totalactual')}</th>
            <th>${t('wd_th_balance')}</th><th>${t('th_dateupdate')}</th><th>${t('th_progress')}</th><th></th>
          </tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="12">${t('wd_empty')}</td></tr>` :
            rows.map(p => {
              const latest = poLatestEntry(p.id);
              const totalActual = poActualTotal(p.id);
              const balance = num(p.poAmount) - totalActual;
              const prog = poProgress(p);
              return `
              <tr>
                <td data-label="${esc(t('th_contractno'))}"><b>${esc(p.contractNo)}</b></td>
                <td data-label="${esc(t('po_th_displayname'))}">${esc(p.displayName)}</td>
                <td data-label="${esc(t('po_th_pmt'))}">${esc(p.pmt)}</td>
                <td data-label="${esc(t('po_th_ponumber'))}">${esc(p.poNumber)}</td>
                <td data-label="${esc(t('wd_th_target'))}">${latest ? fmtMoney(latest.target) : '-'}</td>
                <td data-label="${esc(t('wd_th_actual'))}">${latest ? fmtMoney(latest.actual) : '-'}</td>
                <td data-label="${esc(t('wd_th_totalpo'))}">${fmtMoney(p.poAmount)}</td>
                <td data-label="${esc(t('wd_th_totalactual'))}">${fmtMoney(totalActual)}</td>
                <td data-label="${esc(t('wd_th_balance'))}" style="color:${balance<0?'var(--red)':'var(--text)'}">${fmtMoney(balance)}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${latest ? fmtDate(latest.dateUpdate) : '-'}</td>
                <td data-label="${esc(t('th_progress'))}">${prog!=null ? prog.toFixed(0)+'%' : '-'}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openWDEntryModal('${p.id}')">${t('action_addupdate')}</button>
                  <button onclick="openWDHistoryModal('${p.id}')">${t('action_history')}</button>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function openWDEntryModal(poId, entryId){
  const po = state.purchaseOrders.find(x=>x.id===poId);
  const entry = entryId ? state.workDone.find(x=>x.id===entryId) : {};
  const isEdit = !!entryId;
  openModal(`
    <h3>${isEdit?t('wd_modal_edit'):t('wd_modal_add')}</h3>
    <div class="field-grid">
      <div class="field"><label>${t('th_contractno')}</label><input value="${esc(po.contractNo)}" disabled></div>
      <div class="field"><label>${t('fld_displayname')}</label><input id="f_projectName" value="${esc(po.displayName||'')}"></div>
      <div class="field"><label>${t('fld_period')}</label><input id="f_period" type="month" value="${esc(entry.period||todayISO().slice(0,7))}"></div>
      <div class="field"><label>${t('fld_target')}</label><input id="f_target" type="number" step="0.01" value="${entry.target||''}"></div>
      <div class="field"><label>${t('fld_actual')}</label><input id="f_actual" type="number" step="0.01" value="${entry.actual||''}"></div>
    </div>
    <div class="field"><label>${t('fld_remark')}</label><textarea id="f_remark">${esc(entry.remark||'')}</textarea></div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveWDEntry('${poId}','${entryId||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function saveWDEntry(poId, entryId){
  const po = state.purchaseOrders.find(x=>x.id===poId);
  const newName = document.getElementById('f_projectName').value.trim();
  if(newName && newName !== po.displayName){
    po.displayName = newName;
    po.dateUpdate = todayISO();
    state.workDone.forEach(w => { if(w.poId===poId) w.displayName = newName; });
  }
  const data = {
    poId, contractNo: po.contractNo, displayName: po.displayName, pmt: po.pmt, poNumber: po.poNumber,
    target: num(document.getElementById('f_target').value),
    actual: num(document.getElementById('f_actual').value),
    remark: document.getElementById('f_remark').value.trim(),
    dateUpdate: todayISO(),
    period: document.getElementById('f_period').value || todayISO().slice(0,7)
  };
  if(entryId){
    const idx = state.workDone.findIndex(x=>x.id===entryId);
    state.workDone[idx] = { ...state.workDone[idx], ...data };
  } else {
    state.workDone.push({ id: uid(), ...data });
  }
  checkAutoComplete(poId);
  saveState(); closeModal(); renderAll();
  toast(t('toast_wd_saved'), 'ok');
}
function deleteWDEntry(entryId, poId){
  if(!confirm(t('confirm_delete_wd'))) return;
  state.workDone = state.workDone.filter(x=>x.id!==entryId);
  saveState(); renderAll();
  toast(t('toast_wd_deleted'));
  openWDHistoryModal(poId);
}
function openWDHistoryModal(poId){
  const po = state.purchaseOrders.find(x=>x.id===poId);
  const entries = poWorkDoneEntries(poId).slice().sort((a,b)=>(a.dateUpdate||'').localeCompare(b.dateUpdate||''));
  openModal(`
    <h3>${t('wd_history_title')}</h3>
    <p class="hint" style="margin-bottom:10px"><b>${esc(po.contractNo)}</b> — ${esc(po.displayName||po.poNumber)}</p>
    <div class="tblwrap" style="max-height:320px">
      <table>
        <thead><tr><th>${t('th_dateupdate')}</th><th>${t('fld_target')}</th><th>${t('fld_actual')}</th><th>${t('fld_remark')}</th><th></th></tr></thead>
        <tbody>
          ${entries.length===0 ? `<tr class="empty-row"><td colspan="5">${t('wd_no_entries')}</td></tr>` :
          entries.map(en => `
            <tr>
              <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(en.dateUpdate)}</td>
              <td data-label="${esc(t('fld_target'))}">${fmtMoney(en.target)}</td>
              <td data-label="${esc(t('fld_actual'))}">${fmtMoney(en.actual)}</td>
              <td data-label="${esc(t('fld_remark'))}">${esc(en.remark)}</td>
              <td class="td-actions"><div class="small-actions">
                <button onclick="closeModal();openWDEntryModal('${poId}','${en.id}')">${t('action_edit')}</button>
                <button class="danger" onclick="deleteWDEntry('${en.id}','${poId}')">${t('action_delete')}</button>
              </div></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_close')}</button>
      <button class="btn primary" onclick="closeModal();openWDEntryModal('${poId}')">${t('action_addupdate')}</button>
    </div>
  `);
}

/* ===================== PAGE 4: PERMIT TRACKING ===================== */
let permitFilter = '';
function renderPermit(){
  const el = document.getElementById('page-permit');
  const rows = state.permits.filter(p => {
    if(!permitFilter) return true;
    const q = permitFilter.toLowerCase();
    return [p.contractNo,p.displayName,p.submissionRefNo].some(v => String(v||'').toLowerCase().includes(q));
  });
  el.innerHTML = `
    <div class="pagehead"><h2>${t('permit_heading')}</h2><p>${t('permit_sub')}</p></div>
    <div class="card">
      <div class="toolbar">
        <input type="text" id="permitSearch" placeholder="${esc(t('search_placeholder_permit'))}" value="${esc(permitFilter)}" oninput="permitFilter=this.value; renderPermit();">
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('permit')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('permitFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="permitFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'permit')">
        <button class="icon-btn" onclick="exportSheet(state.permits,'Permit')">${icon('download')} ${t('btn_export')}</button>
        <button class="icon-btn primary" onclick="openPermitModal()">${t('btn_addpermit')}</button>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>${t('th_contractno')}</th><th>${t('th_company')}</th><th>${t('th_branch')}</th><th>${t('th_area')}</th>
            <th>${t('po_th_displayname')}</th><th>${t('permit_th_projecttype')}</th><th>${t('permit_th_code')}</th>
            <th>${t('permit_th_submissionref')}</th><th>${t('permit_th_submissiondate')}</th><th>${t('permit_th_owner')}</th><th>${t('permit_th_statuspermit')}</th>
            <th>${t('permit_th_targetstart')}</th><th>${t('permit_th_permitstart')}</th><th>${t('permit_th_permitend')}</th>
            <th>${t('permit_th_countdown')}</th><th>${t('po_th_pic')}</th><th>${t('permit_th_actionremark')}</th>
            <th>${t('th_dateupdate')}</th><th>${t('th_progress')}</th><th></th>
          </tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="20">${t('permit_empty')}</td></tr>` :
            rows.map(p => {
              const cd = countdownDays(p.permitEnd);
              const prog = PERMIT_STATUS_PROGRESS[p.statusPermit] ?? null;
              return `
              <tr>
                <td data-label="${esc(t('th_contractno'))}"><b>${esc(p.contractNo)}</b></td>
                <td data-label="${esc(t('th_company'))}">${esc(p.company)}</td>
                <td data-label="${esc(t('th_branch'))}">${esc(p.branch)}</td>
                <td data-label="${esc(t('th_area'))}">${esc(p.area)}</td>
                <td data-label="${esc(t('po_th_displayname'))}">${esc(p.displayName)}</td>
                <td data-label="${esc(t('permit_th_projecttype'))}">${p.projectType ? t('opt_'+p.projectType) : '-'}</td>
                <td data-label="${esc(t('permit_th_code'))}">${esc((p.code||'').toUpperCase())}</td>
                <td data-label="${esc(t('permit_th_submissionref'))}">${esc(p.submissionRefNo)}</td>
                <td data-label="${esc(t('permit_th_submissiondate'))}">${fmtDate(p.submissionDate)}</td>
                <td data-label="${esc(t('permit_th_owner'))}">${p.owner ? t('opt_owner_'+p.owner) : '-'}</td>
                <td data-label="${esc(t('permit_th_statuspermit'))}"><span class="pill ${PERMIT_STATUS_PILL[p.statusPermit]||'grey'}">${permitStatusLabel(p.statusPermit)}</span></td>
                <td data-label="${esc(t('permit_th_targetstart'))}">${fmtDate(p.targetToStartWork)}</td>
                <td data-label="${esc(t('permit_th_permitstart'))}">${fmtDate(p.permitStart)}</td>
                <td data-label="${esc(t('permit_th_permitend'))}">${fmtDate(p.permitEnd)}</td>
                <td data-label="${esc(t('permit_th_countdown'))}" style="color:${cd!=null && cd<=30 ? 'var(--red)':'var(--text)'}">${cd==null?'-':(cd<0?t('countdown_expired',{n:Math.abs(cd)}):cd)}</td>
                <td data-label="${esc(t('po_th_pic'))}">${esc(p.pic)}</td>
                <td data-label="${esc(t('permit_th_actionremark'))}">${esc(p.actionRemark)}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(p.dateUpdate)}</td>
                <td data-label="${esc(t('th_progress'))}">${prog!=null?prog+'%':'-'}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openPermitModal('${p.id}')">${t('action_edit')}</button>
                  <button class="danger" onclick="deletePermit('${p.id}')">${t('action_delete')}</button>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function openPermitModal(id){
  const p = id ? state.permits.find(x=>x.id===id) : {};
  const isEdit = !!id;
  const contractOptions = state.contracts.map(c=>`<option value="${esc(c.contractNo)}" ${p.contractNo===c.contractNo?'selected':''}>${esc(c.contractNo)}</option>`).join('');
  const projOptions = state.purchaseOrders.map(po=>po.displayName).filter((v,i,a)=>v && a.indexOf(v)===i).map(n=>`<option value="${esc(n)}">`).join('');
  openModal(`
    <h3>${isEdit?t('permit_modal_edit'):t('permit_modal_add')}</h3>
    ${state.contracts.length===0 ? `<p class="hint" style="color:var(--red);margin-bottom:10px">${t('err_no_contracts_yet')}</p>` : ''}
    <div class="field-grid">
      <div class="field"><label>${t('fld_contractno')}</label>
        <select id="f_contractNo" onchange="prefillPermitFromContract(this.value)"><option value="">--</option>${contractOptions}</select>
      </div>
      <div class="field"><label>${t('fld_displayname')}</label><input list="projList" id="f_displayName" value="${esc(p.displayName||'')}"><datalist id="projList">${projOptions}</datalist></div>
      <div class="field"><label>${t('fld_company')}</label><input id="f_company" value="${esc(p.company||'')}"></div>
      <div class="field"><label>${t('fld_branch')}</label><input id="f_branch" value="${esc(p.branch||'')}"></div>
      <div class="field"><label>${t('fld_area')}</label><input id="f_area" value="${esc(p.area||'')}"></div>
      <div class="field"><label>${t('fld_projecttype')}</label>
        <select id="f_projectType"><option value="">--</option>${PROJECT_TYPE_OPTIONS.map(o=>`<option value="${o}" ${p.projectType===o?'selected':''}>${t('opt_'+o)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${t('fld_code')}</label>
        <select id="f_code"><option value="">--</option>${['HDD','OC','CL','JT'].map(o=>`<option value="${o}" ${p.code===o?'selected':''}>${o}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${t('fld_submissionref')}</label><input id="f_submissionRefNo" value="${esc(p.submissionRefNo||'')}"></div>
      <div class="field"><label>${t('fld_submissiondate')}</label><input id="f_submissionDate" type="date" value="${toISODate(p.submissionDate)}"></div>
      <div class="field"><label>${t('fld_owner')}</label>
        <select id="f_owner"><option value="">--</option>${OWNER_OPTIONS.map(o=>`<option value="${o}" ${p.owner===o?'selected':''}>${t('opt_owner_'+o)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${t('fld_statuspermit')}</label>
        <select id="f_statusPermit">${PERMIT_STATUS_OPTIONS.map(o=>`<option value="${o}" ${(p.statusPermit||'pending')===o?'selected':''}>${t('status_'+o)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${t('fld_targetstart')}</label><input id="f_targetToStartWork" type="date" value="${toISODate(p.targetToStartWork)}"></div>
      <div class="field"><label>${t('fld_permitstart')}</label><input id="f_permitStart" type="date" value="${toISODate(p.permitStart)}"></div>
      <div class="field"><label>${t('fld_permitend')}</label><input id="f_permitEnd" type="date" value="${toISODate(p.permitEnd)}"></div>
      <div class="field"><label>${t('fld_pic')}</label><input id="f_pic" value="${esc(p.pic||'')}"></div>
    </div>
    <div class="field"><label>${t('fld_actionremark')}</label><textarea id="f_actionRemark">${esc(p.actionRemark||'')}</textarea></div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="savePermit('${id||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function prefillPermitFromContract(contractNo){
  const c = state.contracts.find(x=>x.contractNo===contractNo);
  if(!c) return;
  const companyEl = document.getElementById('f_company');
  const branchEl = document.getElementById('f_branch');
  const areaEl = document.getElementById('f_area');
  if(companyEl && !companyEl.value) companyEl.value = c.company||'';
  if(branchEl && !branchEl.value) branchEl.value = c.branch||'';
  if(areaEl && !areaEl.value) areaEl.value = c.area||'';
}
function savePermit(id){
  const contractNo = document.getElementById('f_contractNo').value.trim();
  if(!contractNo){ toast(t('err_contractno_required'), 'err'); return; }
  if(!state.contracts.some(c=>c.contractNo===contractNo)){ toast(t('err_contract_notfound'), 'err'); return; }
  const data = {
    contractNo,
    displayName: document.getElementById('f_displayName').value.trim(),
    company: document.getElementById('f_company').value.trim(),
    branch: document.getElementById('f_branch').value.trim(),
    area: document.getElementById('f_area').value.trim(),
    projectType: document.getElementById('f_projectType').value,
    code: document.getElementById('f_code').value,
    submissionRefNo: document.getElementById('f_submissionRefNo').value.trim(),
    submissionDate: document.getElementById('f_submissionDate').value,
    owner: document.getElementById('f_owner').value,
    statusPermit: document.getElementById('f_statusPermit').value,
    targetToStartWork: document.getElementById('f_targetToStartWork').value,
    permitStart: document.getElementById('f_permitStart').value,
    permitEnd: document.getElementById('f_permitEnd').value,
    pic: document.getElementById('f_pic').value.trim(),
    actionRemark: document.getElementById('f_actionRemark').value.trim(),
    dateUpdate: todayISO()
  };
  if(id){
    const idx = state.permits.findIndex(x=>x.id===id);
    state.permits[idx] = { ...state.permits[idx], ...data };
  } else {
    state.permits.push({ id: uid(), ...data });
  }
  saveState(); closeModal(); renderAll();
  toast(t('toast_permit_saved'), 'ok');
}
function deletePermit(id){
  if(!confirm(t('confirm_delete_permit'))) return;
  state.permits = state.permits.filter(x=>x.id!==id);
  saveState(); renderAll();
  toast(t('toast_permit_deleted'));
}

/* ===================== PAGE 5: PROJECT COMPLETED ===================== */
function renderComplete(){
  const el = document.getElementById('page-complete');
  const rows = state.purchaseOrders.filter(p => p.status === 'complete');
  el.innerHTML = `
    <div class="pagehead"><h2>${t('complete_heading')}</h2><p>${t('complete_sub')}</p></div>
    <div class="card">
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>${t('th_contractno')}</th><th>${t('th_company')}</th><th>${t('th_branch')}</th><th>${t('th_area')}</th>
            <th>${t('po_th_displayname')}</th><th>${t('complete_th_projecttype')}</th><th>${t('complete_th_code')}</th>
            <th>${t('complete_th_submissionref')}</th><th>${t('permit_th_submissiondate')}</th><th>${t('complete_th_owner')}</th><th>${t('po_th_pic')}</th>
            <th>${t('complete_th_actionremark')}</th><th>${t('th_dateupdate')}</th><th></th>
          </tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="14">${t('complete_empty')}</td></tr>` :
            rows.map(p => {
              const matches = resolvePermitsForProject(p.contractNo, p.displayName);
              const permit = matches[0] || {};
              const c = state.contracts.find(x=>x.contractNo===p.contractNo) || {};
              return `
              <tr>
                <td data-label="${esc(t('th_contractno'))}"><b>${esc(p.contractNo)}</b></td>
                <td data-label="${esc(t('th_company'))}">${esc(permit.company || c.company || '-')}</td>
                <td data-label="${esc(t('th_branch'))}">${esc(permit.branch || c.branch || '-')}</td>
                <td data-label="${esc(t('th_area'))}">${esc(permit.area || c.area || '-')}</td>
                <td data-label="${esc(t('po_th_displayname'))}">${esc(p.displayName)}</td>
                <td data-label="${esc(t('complete_th_projecttype'))}">${permit.projectType ? t('opt_'+permit.projectType) : '-'}</td>
                <td data-label="${esc(t('complete_th_code'))}">${esc((permit.code||'-').toUpperCase())}</td>
                <td data-label="${esc(t('complete_th_submissionref'))}">${esc(permit.submissionRefNo||'-')}</td>
                <td data-label="${esc(t('permit_th_submissiondate'))}">${fmtDate(permit.submissionDate)}</td>
                <td data-label="${esc(t('complete_th_owner'))}">${permit.owner ? t('opt_owner_'+permit.owner) : '-'}</td>
                <td data-label="${esc(t('po_th_pic'))}">${esc(permit.pic || p.pic || '-')}</td>
                <td data-label="${esc(t('complete_th_actionremark'))}">${esc(permit.actionRemark || p.remark || '-')}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(p.dateUpdate)}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openCompleteEditModal('${p.id}')">${t('action_edit')}</button>
                  <button class="link-btn" onclick="reopenPO('${p.id}')">${t('action_reopen')}</button>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function openCompleteEditModal(poId){
  const p = state.purchaseOrders.find(x=>x.id===poId);
  const matches = resolvePermitsForProject(p.contractNo, p.displayName);
  const permit = matches[0] || {};
  openModal(`
    <h3>${t('complete_edit_title')}</h3>
    <p class="hint" style="margin-bottom:10px"><b>${esc(p.contractNo)}</b> — ${esc(p.displayName||p.poNumber)}</p>
    <div class="field-grid">
      <div class="field"><label>${t('fld_submissionref')}</label><input id="f_submissionRefNo" value="${esc(permit.submissionRefNo||'')}"></div>
      <div class="field"><label>${t('fld_submissiondate')}</label><input id="f_submissionDate" type="date" value="${toISODate(permit.submissionDate)}"></div>
      <div class="field"><label>${t('fld_owner')}</label>
        <select id="f_owner"><option value="">--</option>${OWNER_OPTIONS.map(o=>`<option value="${o}" ${permit.owner===o?'selected':''}>${t('opt_owner_'+o)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>${t('fld_pic')}</label><input id="f_pic" value="${esc(permit.pic || p.pic || '')}"></div>
    </div>
    <div class="field"><label>${t('fld_actionremark')}</label><textarea id="f_actionRemark">${esc(permit.actionRemark || p.remark || '')}</textarea></div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveCompleteEdit('${poId}')">${t('btn_save')}</button>
    </div>
  `);
}
function saveCompleteEdit(poId){
  const p = state.purchaseOrders.find(x=>x.id===poId);
  const matches = resolvePermitsForProject(p.contractNo, p.displayName);
  const data = {
    submissionRefNo: document.getElementById('f_submissionRefNo').value.trim(),
    submissionDate: document.getElementById('f_submissionDate').value,
    owner: document.getElementById('f_owner').value,
    pic: document.getElementById('f_pic').value.trim(),
    actionRemark: document.getElementById('f_actionRemark').value.trim(),
    dateUpdate: todayISO()
  };
  if(matches[0]){
    Object.assign(matches[0], data);
  } else {
    const c = state.contracts.find(x=>x.contractNo===p.contractNo) || {};
    state.permits.push({
      id: uid(), contractNo: p.contractNo, displayName: p.displayName,
      company: c.company||'', branch: c.branch||'', area: c.area||'',
      projectType: '', code: '', statusPermit: 'approved',
      targetToStartWork: '', permitStart: '', permitEnd: '',
      ...data
    });
  }
  p.dateUpdate = todayISO();
  saveState(); closeModal(); renderAll();
  toast(t('toast_permit_saved'), 'ok');
}

/* ===================== PAGE 6: COLLECTION TARGET ===================== */
let collectionSelectedBranches = new Set();
function toggleCollectionBranch(branch){
  if(collectionSelectedBranches.has(branch)) collectionSelectedBranches.delete(branch);
  else collectionSelectedBranches.add(branch);
  renderCollection();
}
function clearCollectionBranchFilter(){ collectionSelectedBranches.clear(); renderCollection(); }
function renderCollection(){
  const el = document.getElementById('page-collection');
  const rows = state.collectionTargets;
  const sumTarget = rows.reduce((s,r)=>s+num(r.targetAmount),0);
  const sumInvoice = rows.reduce((s,r)=>s+num(r.totalInvoice),0);
  const sumAchieved = sumTarget>0 ? (sumInvoice/sumTarget*100) : null;
  const cs = state.collectionSummary || {};
  const filtered = collectionSelectedBranches.size>0 ? rows.filter(r=>collectionSelectedBranches.has(r.branch)) : rows;
  const fTarget = filtered.reduce((s,r)=>s+num(r.targetAmount),0);
  const fInvoice = filtered.reduce((s,r)=>s+num(r.totalInvoice),0);
  const fAchieved = fTarget>0 ? (fInvoice/fTarget*100) : null;
  el.innerHTML = `
    <div class="pagehead"><h2>${t('collection_heading')}</h2><p>${t('collection_sub')}</p></div>

    <div class="card">
      <div class="chead"><div><h3>${t('collection_filtered_title')}</h3><p>${collectionSelectedBranches.size>0 ? [...collectionSelectedBranches].join(', ') : t('collection_filtered_all')}</p></div>
        ${collectionSelectedBranches.size>0 ? `<button class="icon-btn" onclick="clearCollectionBranchFilter()">${t('btn_clearfilter')}</button>` : ''}
      </div>
      <div class="grid-kpi">
        <div class="kpi"><div class="top"><div class="chip" style="background:var(--amber-bg);color:var(--amber)">${icon('target')}</div><div class="lbl">${t('collection_th_target')}</div></div>
          <div class="num">${fmtMoney(fTarget)}</div></div>
        <div class="kpi"><div class="top"><div class="chip" style="background:var(--green-bg);color:var(--green)">${icon('checkCircle')}</div><div class="lbl">${t('collection_th_invoice')}</div></div>
          <div class="num">${fmtMoney(fInvoice)}</div></div>
        <div class="kpi"><div class="top"><div class="chip" style="background:var(--accent-soft);color:var(--accent2)">${icon('banknote')}</div><div class="lbl">${t('collection_th_achieved')}</div></div>
          <div class="num">${fAchieved!=null?fAchieved.toFixed(0)+'%':'-'}</div></div>
      </div>
    </div>

    <div class="card">
      <div class="toolbar">
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('collection')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('collectionFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="collectionFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'collection')">
        <button class="icon-btn" onclick="exportSheet(state.collectionTargets,'CollectionTarget')">${icon('download')} ${t('btn_export')}</button>
        <button class="icon-btn primary" onclick="openCollectionModal()">${t('btn_addcollection')}</button>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th></th><th>${t('collection_th_branch')}</th><th>${t('collection_th_target')}</th><th>${t('collection_th_invoice')}</th>
            <th>${t('collection_th_achieved')}</th><th>${t('th_dateupdate')}</th><th></th>
          </tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="7">${t('collection_empty')}</td></tr>` :
            rows.map(r => {
              const achieved = num(r.targetAmount)>0 ? (num(r.totalInvoice)/num(r.targetAmount)*100) : null;
              return `
              <tr>
                <td data-label="${esc(t('collection_th_filter'))}"><input type="checkbox" ${collectionSelectedBranches.has(r.branch)?'checked':''} onchange="toggleCollectionBranch('${esc(r.branch)}')"></td>
                <td data-label="${esc(t('collection_th_branch'))}"><b>${esc(r.branch)}</b></td>
                <td data-label="${esc(t('collection_th_target'))}">${fmtMoney(r.targetAmount)}</td>
                <td data-label="${esc(t('collection_th_invoice'))}">${fmtMoney(r.totalInvoice)}</td>
                <td data-label="${esc(t('collection_th_achieved'))}">${achieved!=null?achieved.toFixed(0)+'%':'-'}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(r.dateUpdate)}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openCollectionModal('${r.id}')">${t('action_edit')}</button>
                  <button class="danger" onclick="deleteCollection('${r.id}')">${t('action_delete')}</button>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
          ${rows.length>0 ? `
          <tfoot><tr style="font-weight:700;background:var(--card2)">
            <td data-label="${esc(t('collection_th_filter'))}"></td>
            <td data-label="${esc(t('collection_th_branch'))}">${t('collection_grandtotal')}</td>
            <td data-label="${esc(t('collection_th_target'))}">${fmtMoney(sumTarget)}</td>
            <td data-label="${esc(t('collection_th_invoice'))}">${fmtMoney(sumInvoice)}</td>
            <td data-label="${esc(t('collection_th_achieved'))}">${sumAchieved!=null?sumAchieved.toFixed(0)+'%':'-'}</td>
            <td data-label="${esc(t('th_dateupdate'))}"></td><td class="td-actions"></td>
          </tr></tfoot>` : ''}
        </table>
      </div>
    </div>

    <div class="card">
      <div class="chead"><div><h3>${t('collection_summary_title')}</h3><p>${cs.asOfDate ? t('collection_asof',{date:fmtDate(cs.asOfDate)}) : ''}</p></div>
        <button class="icon-btn" onclick="openCollectionSummaryModal()">${t('action_edit')}</button>
      </div>
      <div class="grid-kpi">
        <div class="kpi"><div class="top"><div class="chip" style="background:var(--amber-bg);color:var(--amber)">${icon('banknote')}</div><div class="lbl">${t('fld_odutil')}</div></div>
          <div class="num">${fmtMoney(cs.odUtilization)}</div></div>
        <div class="kpi"><div class="top"><div class="chip" style="background:var(--red-bg);color:var(--red)">${icon('clock')}</div><div class="lbl">${t('fld_creditors')}</div></div>
          <div class="num">${fmtMoney(cs.creditorsOutstanding)}</div></div>
      </div>
    </div>
  `;
}
function openCollectionModal(id){
  const r = id ? state.collectionTargets.find(x=>x.id===id) : {};
  const isEdit = !!id;
  openModal(`
    <h3>${isEdit?t('collection_modal_edit'):t('collection_modal_add')}</h3>
    <div class="field-grid">
      <div class="field"><label>${t('collection_th_branch')} *</label><input id="f_branch" value="${esc(r.branch||'')}" ${isEdit?'disabled':''}></div>
      <div class="field"><label>${t('fld_targetamount')}</label><input id="f_targetAmount" type="number" step="0.01" value="${r.targetAmount||''}"></div>
      <div class="field"><label>${t('fld_totalinvoice')}</label><input id="f_totalInvoice" type="number" step="0.01" value="${r.totalInvoice||''}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveCollection('${id||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function saveCollection(id){
  const data = {
    targetAmount: num(document.getElementById('f_targetAmount').value),
    totalInvoice: num(document.getElementById('f_totalInvoice').value),
    dateUpdate: todayISO()
  };
  if(id){
    const r = state.collectionTargets.find(x=>x.id===id);
    Object.assign(r, data);
  } else {
    const branch = document.getElementById('f_branch').value.trim();
    if(!branch){ toast(t('err_branch_required'), 'err'); return; }
    if(state.collectionTargets.some(r=>r.branch===branch)){ toast(t('err_branch_exists'), 'err'); return; }
    state.collectionTargets.push({ id: uid(), branch, ...data });
  }
  saveState(); closeModal(); renderAll();
  toast(t('toast_collection_saved'), 'ok');
}
function openCollectionSummaryModal(){
  const cs = state.collectionSummary || {};
  openModal(`
    <h3>${t('collection_summary_title')}</h3>
    <div class="field-grid">
      <div class="field"><label>${t('fld_asofdate')}</label><input id="f_asOfDate" type="date" value="${toISODate(cs.asOfDate)}"></div>
      <div class="field"><label>${t('fld_odutil')}</label><input id="f_odUtilization" type="number" step="0.01" value="${cs.odUtilization||''}"></div>
      <div class="field"><label>${t('fld_creditors')}</label><input id="f_creditorsOutstanding" type="number" step="0.01" value="${cs.creditorsOutstanding||''}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveCollectionSummary()">${t('btn_save')}</button>
    </div>
  `);
}
function saveCollectionSummary(){
  state.collectionSummary = {
    asOfDate: document.getElementById('f_asOfDate').value,
    odUtilization: num(document.getElementById('f_odUtilization').value),
    creditorsOutstanding: num(document.getElementById('f_creditorsOutstanding').value)
  };
  saveState(); closeModal(); renderAll();
  toast(t('toast_collection_saved'), 'ok');
}
function deleteCollection(id){
  if(!confirm(t('confirm_delete_collection'))) return;
  state.collectionTargets = state.collectionTargets.filter(x=>x.id!==id);
  saveState(); renderAll();
  toast(t('toast_collection_deleted'));
}

/* ===================== PAGE 7: PO BERTINDIH (DUPLICATE PO) ===================== */
function renderOverlap(){
  const el = document.getElementById('page-overlap');
  const groups = duplicatePoGroups();
  el.innerHTML = `
    <div class="pagehead"><h2>${t('overlap_heading')}</h2><p>${t('overlap_sub')}</p></div>
    ${groups.length===0 ? `<div class="card"><p class="hint" style="text-align:center;padding:20px 0">${t('overlap_empty')}</p></div>` :
    groups.map(group => `
      <div class="card">
        <div class="chead"><div><h3>${t('overlap_group_title',{po:esc(group[0].poNumber)})}</h3><p>${t('overlap_group_sub',{n:group.length})}</p></div></div>
        <div class="tblwrap">
          <table>
            <thead><tr>
              <th>${t('th_contractno')}</th><th>${t('po_th_displayname')}</th><th>${t('po_th_poamount')}</th>
              <th>${t('po_th_podate')}</th><th>${t('po_th_pmt')}</th><th>${t('po_th_pic')}</th><th>${t('th_status')}</th><th></th>
            </tr></thead>
            <tbody>
              ${group.map(p => `
                <tr>
                  <td data-label="${esc(t('th_contractno'))}"><b>${esc(p.contractNo)}</b></td>
                  <td data-label="${esc(t('po_th_displayname'))}">${esc(p.displayName)}</td>
                  <td data-label="${esc(t('po_th_poamount'))}">${fmtMoney(p.poAmount)}</td>
                  <td data-label="${esc(t('po_th_podate'))}">${fmtDate(p.poDate)}</td>
                  <td data-label="${esc(t('po_th_pmt'))}">${esc(p.pmt)}</td>
                  <td data-label="${esc(t('po_th_pic'))}">${esc(p.pic)}</td>
                  <td data-label="${esc(t('th_status'))}">${p.status==='complete' ? `<span class="pill ok">${t('action_complete')}</span>` : `<span class="pill grey">${t('status_ok')}</span>`}</td>
                  <td class="td-actions"><div class="small-actions">
                    <button onclick="openPOModal('${p.id}')">${t('action_edit')}</button>
                    <button class="danger" onclick="deletePO('${p.id}')">${t('action_delete')}</button>
                  </div></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`).join('')}
  `;
}

/* ===================== PAGE 8: ADMIN ===================== */
function renderAdmin(){
  const el = document.getElementById('page-admin');
  const rows = state.adminContacts;
  el.innerHTML = `
    <div class="pagehead"><h2>${t('admin_heading')}</h2><p>${t('admin_sub')}</p></div>
    <div class="card">
      <div class="toolbar">
        <div class="spacer"></div>
        <button class="icon-btn" onclick="downloadTemplate('admin')">${icon('download')} ${t('btn_template')}</button>
        <button class="icon-btn" onclick="document.getElementById('adminFileInput').click()">${icon('upload')} ${t('btn_upload')}</button>
        <input type="file" id="adminFileInput" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleFileUpload(this.files[0],'admin')">
        <button class="icon-btn" onclick="exportSheet(state.adminContacts,'AdminContacts')">${icon('download')} ${t('btn_export')}</button>
        <button class="icon-btn primary" onclick="openAdminModal()">${t('btn_addcontact')}</button>
      </div>
      <p class="hint" style="margin-bottom:12px">${t('admin_hint')}</p>
      <div class="tblwrap">
        <table>
          <thead><tr><th>${t('th_branch')}</th><th>${t('admin_th_pic')}</th><th>${t('admin_th_email')}</th><th>${t('th_dateupdate')}</th><th></th></tr></thead>
          <tbody>
            ${rows.length===0 ? `<tr class="empty-row"><td colspan="5">${t('admin_empty')}</td></tr>` :
            rows.map(r => `
              <tr>
                <td data-label="${esc(t('th_branch'))}"><b>${esc(r.branch)}</b></td>
                <td data-label="${esc(t('admin_th_pic'))}">${esc(r.picName)}</td>
                <td data-label="${esc(t('admin_th_email'))}">${esc(r.email)}</td>
                <td data-label="${esc(t('th_dateupdate'))}">${fmtDate(r.dateUpdate)}</td>
                <td class="td-actions"><div class="small-actions">
                  <button onclick="openAdminModal('${r.id}')">${t('action_edit')}</button>
                  <button class="danger" onclick="deleteAdminContact('${r.id}')">${t('action_delete')}</button>
                </div></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function openAdminModal(id){
  const r = id ? state.adminContacts.find(x=>x.id===id) : {};
  const isEdit = !!id;
  openModal(`
    <h3>${isEdit?t('admin_modal_edit'):t('admin_modal_add')}</h3>
    <div class="field-grid">
      <div class="field"><label>${t('th_branch')} *</label><input id="f_branch" value="${esc(r.branch||'')}"></div>
      <div class="field"><label>${t('admin_th_pic')}</label><input id="f_picName" value="${esc(r.picName||'')}"></div>
      <div class="field" style="grid-column:1 / -1"><label>${t('admin_th_email')} *</label><input id="f_email" type="email" value="${esc(r.email||'')}"></div>
    </div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">${t('btn_cancel')}</button>
      <button class="btn primary" onclick="saveAdminContact('${id||''}')">${t('btn_save')}</button>
    </div>
  `);
}
function saveAdminContact(id){
  const branch = document.getElementById('f_branch').value.trim();
  const email = document.getElementById('f_email').value.trim();
  if(!branch || !email){ toast(t('err_admin_required'), 'err'); return; }
  const data = { branch, picName: document.getElementById('f_picName').value.trim(), email, dateUpdate: todayISO() };
  if(id){
    const idx = state.adminContacts.findIndex(x=>x.id===id);
    state.adminContacts[idx] = { ...state.adminContacts[idx], ...data };
  } else {
    state.adminContacts.push({ id: uid(), ...data });
  }
  saveState(); closeModal(); renderAll();
  toast(t('toast_admin_saved'), 'ok');
}
function deleteAdminContact(id){
  if(!confirm(t('confirm_delete_admin'))) return;
  state.adminContacts = state.adminContacts.filter(x=>x.id!==id);
  saveState(); renderAll();
  toast(t('toast_admin_deleted'));
}

/* ===================== Excel Import ===================== */
function handleFileUpload(file, target){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type:'array', cellDates:true });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval:'' });
      if(rows.length===0){ toast(t('toast_excel_empty'), 'err'); return; }
      if(target==='po') importPORows(rows);
      else if(target==='workdone') importWDRows(rows);
      else if(target==='contract') importContractRows(rows);
      else if(target==='permit') importPermitRows(rows);
      else if(target==='collection') importCollectionRows(rows);
      else if(target==='admin') importAdminRows(rows);
    }catch(err){
      console.error(err);
      toast(t('toast_excel_error') + err.message, 'err');
    }
  };
  reader.readAsArrayBuffer(file);
}
function importPORows(rows){
  let added = 0, updated = 0;
  const skipped = [];
  rows.forEach(row => {
    const m = mapRow(row, PO_FIELD_MAP);
    if(!m.contractNo && !m.poNumber) return;
    const contractNo = String(m.contractNo||'').trim();
    const poNumber = String(m.poNumber||'').trim();
    if(!state.contracts.some(c => c.contractNo === contractNo)){
      skipped.push(`${contractNo || '(kosong)'} / ${poNumber || '-'}`);
      return;
    }
    const existing = poNumber ? state.purchaseOrders.find(p => p.poNumber === poNumber && p.contractNo === contractNo) : null;
    const record = {
      contractNo,
      displayName: String(m.displayName||'').trim(),
      poNumber,
      poAmount: num(m.poAmount),
      poDate: toISODate(m.poDate),
      saidi: String(m.saidi||'').trim(),
      pmt: String(m.pmt||'').trim(),
      projectSecretary: String(m.projectSecretary||'').trim(),
      remark: String(m.remark||'').trim(),
      pic: String(m.pic||'').trim(),
      claimAmount: num(m.claimAmount),
      claimDate: toISODate(m.claimDate),
      dateUpdate: todayISO()
    };
    if(existing){ Object.assign(existing, record); updated++; }
    else { state.purchaseOrders.push({ id: uid(), status:'active', ...record }); added++; }
  });
  saveState(); renderAll();
  showImportResult(added, updated, skipped, 'po_skipped_title');
}
function importWDRows(rows){
  let added = 0, updated = 0;
  const skipped = [];
  rows.forEach(row => {
    const norm = {};
    Object.keys(row).forEach(k => { norm[normHeader(k)] = row[k]; });
    const contractNo = String(norm['contract no'] ?? norm['contractno'] ?? '').trim();
    const poNumber = String(norm['po number'] ?? norm['po no'] ?? norm['ponumber'] ?? '').trim();
    if(!contractNo || !poNumber) return;
    const po = state.purchaseOrders.find(p => p.contractNo===contractNo && p.poNumber===poNumber);
    if(!po){ skipped.push(`${contractNo} / ${poNumber}`); return; }
    const year = num(norm['year']) || new Date().getFullYear();
    const target = num(norm['target (rm)'] ?? norm['target']);
    const remark = String(norm['remark'] ?? '').trim();
    MONTH_MAP.forEach(mo => {
      const raw = norm[mo.en] !== undefined ? norm[mo.en] : norm[mo.ms];
      if(raw === undefined || raw === '') return;
      const amt = num(raw);
      if(amt === 0 && target === 0) return;
      const period = `${year}-${String(mo.num).padStart(2,'0')}`;
      const data = { poId: po.id, contractNo: po.contractNo, displayName: po.displayName, pmt: po.pmt, poNumber: po.poNumber, period, target, actual: amt, remark, dateUpdate: todayISO() };
      const existing = state.workDone.find(w => w.poId===po.id && w.period===period);
      if(existing){ Object.assign(existing, data); updated++; }
      else { state.workDone.push({ id: uid(), ...data }); added++; }
    });
    checkAutoComplete(po.id);
  });
  saveState(); renderAll();
  showImportResult(added, updated, skipped, 'wd_skipped_title');
}
function importContractRows(rows){
  let added = 0, updated = 0;
  rows.forEach(row => {
    const m = mapRow(row, CONTRACT_FIELD_MAP);
    if(!m.contractNo) return;
    const contractNo = String(m.contractNo).trim();
    const record = {
      contractAmount: num(m.contractAmount),
      area: String(m.area||'').trim(),
      startDate: toISODate(m.startDate),
      endDate: toISODate(m.endDate),
      guaranteeType: String(m.guaranteeType||'').trim().toUpperCase()==='BG' ? 'BG' : (String(m.guaranteeType||'').trim().toUpperCase()==='BD' ? 'BD' : ''),
      guaranteeAmount: num(m.guaranteeAmount),
      guaranteeStartDate: toISODate(m.guaranteeStartDate),
      guaranteeEndDate: toISODate(m.guaranteeEndDate),
      company: String(m.company||'').trim(),
      branch: String(m.branch||'').trim(),
      dateUpdate: todayISO()
    };
    const existing = state.contracts.find(c => c.contractNo === contractNo);
    if(existing){ Object.assign(existing, record); updated++; }
    else { state.contracts.push({ id: uid(), contractNo, ...record }); added++; }
  });
  saveState(); renderAll();
  toast(t('toast_import_done',{added, updated}), 'ok');
}
function importPermitRows(rows){
  let added = 0, updated = 0;
  rows.forEach(row => {
    const m = mapRow(row, PERMIT_FIELD_MAP);
    if(!m.contractNo) return;
    const contractNo = String(m.contractNo).trim();
    if(!state.contracts.some(c=>c.contractNo===contractNo)) return;
    const record = {
      contractNo,
      displayName: String(m.displayName||'').trim(),
      company: String(m.company||'').trim(),
      branch: String(m.branch||'').trim(),
      area: String(m.area||'').trim(),
      projectType: String(m.projectType||'').trim().toLowerCase().replace(/\s+/g,''),
      code: String(m.code||'').trim().toUpperCase(),
      submissionRefNo: String(m.submissionRefNo||'').trim(),
      submissionDate: toISODate(m.submissionDate),
      owner: String(m.owner||'').trim().toLowerCase(),
      statusPermit: PERMIT_STATUS_OPTIONS.includes(String(m.statusPermit||'').trim().toLowerCase()) ? String(m.statusPermit).trim().toLowerCase() : 'pending',
      targetToStartWork: toISODate(m.targetToStartWork),
      permitStart: toISODate(m.permitStart),
      permitEnd: toISODate(m.permitEnd),
      pic: String(m.pic||'').trim(),
      actionRemark: String(m.actionRemark||'').trim(),
      dateUpdate: todayISO()
    };
    const existing = state.permits.find(p => p.contractNo===contractNo && p.displayName===record.displayName && p.code===record.code);
    if(existing){ Object.assign(existing, record); updated++; }
    else { state.permits.push({ id: uid(), ...record }); added++; }
  });
  saveState(); renderAll();
  toast(t('toast_import_done',{added, updated}), 'ok');
}
function importCollectionRows(rows){
  let added = 0, updated = 0;
  rows.forEach(row => {
    const m = mapRow(row, COLLECTION_FIELD_MAP);
    if(!m.branch) return;
    const branch = String(m.branch).trim();
    const record = {
      targetAmount: num(m.targetAmount),
      totalInvoice: num(m.totalInvoice),
      dateUpdate: todayISO()
    };
    const existing = state.collectionTargets.find(r => r.branch === branch);
    if(existing){ Object.assign(existing, record); updated++; }
    else { state.collectionTargets.push({ id: uid(), branch, ...record }); added++; }
  });
  saveState(); renderAll();
  toast(t('toast_import_done',{added, updated}), 'ok');
}
function importAdminRows(rows){
  let added = 0, updated = 0;
  rows.forEach(row => {
    const m = mapRow(row, ADMIN_FIELD_MAP);
    if(!m.branch || !m.email) return;
    const branch = String(m.branch).trim();
    const record = { picName: String(m.picName||'').trim(), email: String(m.email).trim(), dateUpdate: todayISO() };
    const existing = state.adminContacts.find(r => r.branch === branch);
    if(existing){ Object.assign(existing, record); updated++; }
    else { state.adminContacts.push({ id: uid(), branch, ...record }); added++; }
  });
  saveState(); renderAll();
  toast(t('toast_import_done',{added, updated}), 'ok');
}
function showImportResult(added, updated, skipped, skippedKey){
  if(skipped.length){
    openModal(`
      <h3>${t('import_result_title')}</h3>
      <p class="hint">${t('toast_import_done',{added, updated})}</p>
      <p class="hint" style="margin-top:10px;color:var(--red)">${t(skippedKey,{n:skipped.length})}</p>
      <div class="tblwrap" style="max-height:260px"><table><tbody>
        ${skipped.map(s=>`<tr><td>${esc(s)}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="modal-actions"><button class="btn primary" onclick="closeModal()">${t('btn_close')}</button></div>
    `);
  } else {
    toast(t('toast_import_done',{added, updated}), 'ok');
  }
}
function downloadTemplate(type){
  let headers, sample, filename;
  if(type==='contract'){
    headers = ['Contract No','Contract Value','Area','Start Date','End Date','Bank (BD) / Bank Guarantee (BG)','Amount BD / BG','Start Date (BD/BG)','End Date (BD/BG)','Company','Branch'];
    sample = ['TNB 1805/2023','5000000.00','Utara','2026-01-01','2027-12-31','BG','50000.00','2026-01-01','2027-12-31','Contoh Sdn Bhd','OKLG'];
    filename = 'Template_Contract.xlsx';
  } else if(type==='po'){
    headers = ['Contract No','Project Name','PO Number','PO Amount','Date PO','SAIDI','PMT','PS','Claim Amount','Claim Date','Remarks','PIC Name'];
    sample = ['TNB 1805/2023','Contoh Projek - OKLG','42066894','100000.00','2026-01-15','0.5','Nama PMT','Nama PS','0','','',''];
    filename = 'Template_PO.xlsx';
  } else if(type==='workdone'){
    headers = ['Contract No','PO Number','Year','Target (RM)','January','February','March','April','May','June','July','August','September','October','November','December','Remark'];
    sample = ['TNB 1805/2023','42066894','2026','100000','50000','75000','','','','','','','','','',''];
    filename = 'Template_WorkDone.xlsx';
  } else if(type==='permit'){
    headers = ['Contract No','Project Name','Company','Branch','Area','Project (11kV/33kV/Other)','Code (HDD/OC/CL/JT)','Submission Ref.No.','Submission Date','Owner (PBT/Developer/Utilities)','Status Permit','Target To Start Work','Permit Start','Permit End','PIC Name','Action Remark'];
    sample = ['TNB 1805/2023','Contoh Projek - OKLG','Contoh Sdn Bhd','OKLG','Utara','33kV','HDD','SUB-2026-001','2026-01-20','PBT','submitted','2026-02-01','2026-02-15','2026-08-15','Nama PIC',''];
    filename = 'Template_Permit.xlsx';
  } else if(type==='collection'){
    headers = ['Cawangan','Target (RM)','Total Invoice (RM)'];
    sample = ['SUBANG JAYA (OM)','500000.00','514017.00'];
    filename = 'Template_CollectionTarget.xlsx';
  } else if(type==='admin'){
    headers = ['Branch','PIC Name','Email'];
    sample = ['OKLG','Nama PIC','pic@example.com'];
    filename = 'Template_AdminContacts.xlsx';
  } else return;
  const ws = XLSX.utils.aoa_to_sheet([headers, sample]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, filename);
}
function exportSheet(arr, name){
  if(arr.length===0){ toast(t('toast_export_empty'), 'err'); return; }
  const ws = XLSX.utils.json_to_sheet(arr.map(({id, ...rest}) => rest));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, name);
  XLSX.writeFile(wb, `${name}_${todayISO()}.xlsx`);
}
function exportPO(){
  if(state.purchaseOrders.length===0){ toast(t('toast_export_empty'), 'err'); return; }
  const clean = state.purchaseOrders.map(p => {
    const prog = poProgress(p);
    return { contractNo:p.contractNo, displayName:p.displayName, poNumber:p.poNumber, poAmount:p.poAmount, poDate:p.poDate, saidi:p.saidi, pmt:p.pmt, projectSecretary:p.projectSecretary, claimAmount:p.claimAmount, claimDate:p.claimDate, balanceToClaim:num(p.poAmount)-num(p.claimAmount), remark:p.remark, pic:p.pic, dateUpdate:p.dateUpdate, progressPct: prog!=null?prog.toFixed(1):'' };
  });
  const ws = XLSX.utils.json_to_sheet(clean);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PO');
  XLSX.writeFile(wb, `PO_${todayISO()}.xlsx`);
}
function exportWD(){
  if(state.workDone.length===0){ toast(t('toast_export_empty'), 'err'); return; }
  const ws = XLSX.utils.json_to_sheet(state.workDone.map(({id, poId, ...rest}) => rest));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'WorkDone');
  XLSX.writeFile(wb, `WorkDone_${todayISO()}.xlsx`);
}

/* ===================== Backup / Restore ===================== */
function exportBackup(){
  const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `bulk-contract-backup-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast(t('toast_backup_downloaded'), 'ok');
}
function importBackup(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const incoming = JSON.parse(e.target.result);
      const merge = confirm(t('confirm_merge'));
      if(merge){
        mergeArray(state.contracts, incoming.contracts||[], 'contractNo');
        mergeArray(state.purchaseOrders, incoming.purchaseOrders||[], 'id');
        mergeArray(state.workDone, incoming.workDone||[], 'id');
        mergeArray(state.permits, incoming.permits||[], 'id');
        mergeArray(state.collectionTargets, incoming.collectionTargets||[], 'branch');
        mergeArray(state.adminContacts, incoming.adminContacts||[], 'branch');
        if(incoming.collectionSummary) state.collectionSummary = incoming.collectionSummary;
      } else {
        state = Object.assign(defaultState(), incoming);
      }
      saveState(); renderAll();
      toast(t('toast_backup_uploaded'), 'ok');
    }catch(err){
      toast(t('toast_backup_invalid'), 'err');
    }
  };
  reader.readAsText(file);
}
function mergeArray(target, incoming, key){
  incoming.forEach(item => {
    const idx = target.findIndex(t => t[key]===item[key]);
    if(idx>=0) target[idx] = { ...target[idx], ...item };
    else target.push(item);
  });
}
function clearAllData(){
  if(!confirm(t('confirm_clearall'))) return;
  state = defaultState();
  saveState(); renderAll();
  toast(t('toast_data_cleared'));
}

/* ===================== Modal ===================== */
function openModal(html){
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalBg').classList.add('show');
}
function closeModal(){ document.getElementById('modalBg').classList.remove('show'); }

/* ===================== Mobile sidebar drawer ===================== */
function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarBackdrop').classList.add('show');
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('show');
}

/* ===================== Theme ===================== */
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  document.getElementById('themeIcon').innerHTML = next==='dark' ? icon('sun') : icon('moon');
}

/* ===================== Init ===================== */
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('themeIcon').innerHTML = savedTheme==='dark' ? icon('sun') : icon('moon');

  document.documentElement.lang = lang;
  applyStaticI18n();

  document.querySelectorAll('.nav-item, .bnav-item').forEach(el => {
    el.addEventListener('click', () => { go(el.dataset.page); closeSidebar(); });
  });
  document.getElementById('backupFileInput').addEventListener('change', function(){ importBackup(this.files[0]); this.value=''; });

  go(currentPage());
});
