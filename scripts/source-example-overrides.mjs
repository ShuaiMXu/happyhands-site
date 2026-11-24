// Complete interactive fixtures where upstream documentation deliberately uses
// application variables or abbreviated markup. Original archived files stay intact.
export function exampleOverride(system, name) {
  const family =
    {
      "meridian-mono": "sodium",
      "meridian-glass": "glaze",
      "meridian-slate": "quartz",
      "meridian-clay": "lime",
    }[system] || system;
  if (name === "chip" && family === "lime")
    return "<Chip defaultPressed>Dining</Chip><Chip>Travel</Chip>";
  if (name === "timeline" && family !== "quartz") return null;
  const common = {
    toast:
      family === "lime"
        ? null
        : '<><Toaster/><Button onClick={()=>toast.success("Changes saved")}>Show notification</Button></>',
    response:
      "<Response>The report is ready. **3 records** were checked.</Response>",
    "follow-ups":
      '<FollowUps suggestions={["Show failed runs", "Export the report"]} onSelect={send}/>',
    "prompt-input":
      '<PromptInput status="idle" onSubmit={send} onStop={stop}/>',
    mention:
      '<p>Read <Mention type="file">report.csv</Mention> before continuing.</p>',
    skeleton: "<Skeleton style={{height:24,width:240}}/>",
    chip: '<ChipGroup aria-label="Tags"><Chip onRemove={remove}>Review</Chip><Chip>Published</Chip></ChipGroup>',
    "filter-bar":
      '<FilterBar aria-label="Filter records"><FilterBarSearch placeholder="Search records"/><FilterBarCount shown={3} total={3} noun="records"/></FilterBar>',
    "bulk-action-bar":
      '<BulkActionBar count={2} noun={["record","records"]} onClear={clear}><BulkAction onClick={retry}>Retry</BulkAction></BulkActionBar>',
    timeline:
      '<Timeline label="Import run" spans={[{id:"1",label:"Read file",start:0,end:700,status:"ok"},{id:"2",label:"Validate",start:700,end:1200,status:"ok"}]} now={1200}/>',
    "tool-call":
      family === "lime"
        ? null
        : '<ToolCallList calls={[{id:"call-1",tool:"read_file",status:"completed",seq:1,output:"3 records loaded",startedAt:0,endedAt:1200}]}/>',
    conversation:
      '<Conversation status="idle"><ConversationViewport aria-label="Conversation"><ConversationContent><p>Review the import.</p><p>3 records checked. No errors found.</p></ConversationContent></ConversationViewport><ConversationJump/></Conversation>',
  };
  if (name === "data-grid" && family === "glaze")
    return '<DataGrid aria-label="Runs" title="Runs" columns={[{accessorKey:"id",header:"Run"},{accessorKey:"name",header:"Name"}]} data={runs} getRowId={r=>r.id}/>';
  if (name === "data-grid" && family === "quartz")
    return '<DataGrid rowCount={2} colCount={1}><DataGridTable aria-label="Scores"><DataGridBody>{[0,1].map(row=><DataGridRow key={row} index={row}><DataGridCell row={row} col={0} label={`Score ${row+1}`} value={80+row} editor="number" onCommit={save}/></DataGridRow>)}</DataGridBody></DataGridTable></DataGrid>';
  if (name === "table" && family === "quartz")
    return '<DataTable aria-label="Runs" title="Runs" columns={[{accessorKey:"id",header:"Run"},{accessorKey:"name",header:"Name"}]} data={runs} getRowId={r=>r.id}/>';
  if (name === "command" && (family === "glaze" || family === "sodium"))
    return `<Button variant="outline" onClick={()=>setOpen(true)}>Open command palette</Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Project commands">
        <Command label="Project commands">
          <CommandInput placeholder="Search commands"/>
          <CommandList>
            <CommandEmpty>No matching commands.</CommandEmpty>
            <CommandGroup heading="Project">
              <CommandItem onSelect={()=>setOpen(false)}>Open project</CommandItem>
              <CommandItem onSelect={()=>setOpen(false)}>View recent runs</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>`;
  if (name === "keypad")
    return "<Keypad value={value} onValueChange={setValue}/>";
  if (name === "message" && family === "lime")
    return '<Message from="user">Move $50 to Vacation fund.</Message><Message name="Assistant">Vacation fund is now $290.</Message>';
  if (name === "alert-dialog" && family === "lime")
    return '<AlertDialog><AlertDialogTrigger render={<Button variant="outline"/>}>Delete goal</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete Vacation fund?</AlertDialogTitle><AlertDialogDescription>The saved amount goes back to Checking.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogClose render={<Button variant="outline"/>}>Cancel</AlertDialogClose><AlertDialogClose render={<Button/>}>Delete</AlertDialogClose></AlertDialogFooter></AlertDialogContent></AlertDialog>';
  return common[name] || null;
}
