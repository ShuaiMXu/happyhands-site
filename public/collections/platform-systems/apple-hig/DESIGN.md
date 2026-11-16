# Apple Human Interface Guidelines（可调用版）

> Apple HIG 全量 173 篇的 markdown 版，按平台/基础/组件/模式组织。

## 调用方式

```bash
# 查某个主题
grep -ril "tab bar" platform-systems/apple-hig/docs | head
# 直接读
cat platform-systems/apple-hig/docs/design_human-interface-guidelines_components_tab-bars.md
```

## 为什么 HIG 要单独处理

- HIG **没有 token 文件**：颜色、字号是「建议值 + 语义」，不是机器可读变量
- 它给的是**判断规则**（何时用 Sheet vs Popover、点按区最小多大），这层比 token 更难替代
- 所以这份归档是「规则库」，和 material3 的「token 库」配着用：M3 给值，HIG 给判断

## 索引

| 主题 | 文件 |
|---|---|
| Accessibility | `design_human-interface-guidelines_accessibility.md` |
| Action button | `design_human-interface-guidelines_action-button.md` |
| Action sheets | `design_human-interface-guidelines_action-sheets.md` |
| Activity rings | `design_human-interface-guidelines_activity-rings.md` |
| Activity views | `design_human-interface-guidelines_activity-views.md` |
| AirPlay | `design_human-interface-guidelines_airplay.md` |
| Alerts | `design_human-interface-guidelines_alerts.md` |
| Always On | `design_human-interface-guidelines_always-on.md` |
| App Clips | `design_human-interface-guidelines_app-clips.md` |
| App icons | `design_human-interface-guidelines_app-icons.md` |
| App Shortcuts | `design_human-interface-guidelines_app-shortcuts.md` |
| Apple In-App Purchase | `design_human-interface-guidelines_apple-in-app-purchase.md` |
| Apple Pay | `design_human-interface-guidelines_apple-pay.md` |
| Apple Pencil and Scribble | `design_human-interface-guidelines_apple-pencil-and-scribble.md` |
| Augmented reality | `design_human-interface-guidelines_augmented-reality.md` |
| Boxes | `design_human-interface-guidelines_boxes.md` |
| Branding | `design_human-interface-guidelines_branding.md` |
| Buttons | `design_human-interface-guidelines_buttons.md` |
| Camera Control | `design_human-interface-guidelines_camera-control.md` |
| CareKit | `design_human-interface-guidelines_carekit.md` |
| CarPlay | `design_human-interface-guidelines_carplay.md` |
| Charting data | `design_human-interface-guidelines_charting-data.md` |
| Charts | `design_human-interface-guidelines_charts.md` |
| Collaboration and sharing | `design_human-interface-guidelines_collaboration-and-sharing.md` |
| Collections | `design_human-interface-guidelines_collections.md` |
| Color wells | `design_human-interface-guidelines_color-wells.md` |
| Color | `design_human-interface-guidelines_color.md` |
| Column views | `design_human-interface-guidelines_column-views.md` |
| Combo boxes | `design_human-interface-guidelines_combo-boxes.md` |
| Complications | `design_human-interface-guidelines_complications.md` |
| Components | `design_human-interface-guidelines_components.md` |
| Content | `design_human-interface-guidelines_content.md` |
| Context menus | `design_human-interface-guidelines_context-menus.md` |
| Controls | `design_human-interface-guidelines_controls.md` |
| Dark Mode | `design_human-interface-guidelines_dark-mode.md` |
| Design principles | `design_human-interface-guidelines_design-principles.md` |
| Designing for games | `design_human-interface-guidelines_designing-for-games.md` |
| Designing for iOS | `design_human-interface-guidelines_designing-for-ios.md` |
| Designing for iPadOS | `design_human-interface-guidelines_designing-for-ipados.md` |
| Designing for iPhone Duo | `design_human-interface-guidelines_designing-for-iphone-duo.md` |
| Designing for macOS | `design_human-interface-guidelines_designing-for-macos.md` |
| Designing for tvOS | `design_human-interface-guidelines_designing-for-tvos.md` |
| Designing for visionOS | `design_human-interface-guidelines_designing-for-visionos.md` |
| Designing for watchOS | `design_human-interface-guidelines_designing-for-watchos.md` |
| Digit entry views | `design_human-interface-guidelines_digit-entry-views.md` |
| Digital Crown | `design_human-interface-guidelines_digital-crown.md` |
| Disclosure controls | `design_human-interface-guidelines_disclosure-controls.md` |
| Dock menus | `design_human-interface-guidelines_dock-menus.md` |
| Drag and drop | `design_human-interface-guidelines_drag-and-drop.md` |
| Edit menus | `design_human-interface-guidelines_edit-menus.md` |
| Entering data | `design_human-interface-guidelines_entering-data.md` |
| Eyes | `design_human-interface-guidelines_eyes.md` |
| Feedback | `design_human-interface-guidelines_feedback.md` |
| File management | `design_human-interface-guidelines_file-management.md` |
| Focus and selection | `design_human-interface-guidelines_focus-and-selection.md` |
| Foundations | `design_human-interface-guidelines_foundations.md` |
| Game Center | `design_human-interface-guidelines_game-center.md` |
| Game controls | `design_human-interface-guidelines_game-controls.md` |
| Gauges | `design_human-interface-guidelines_gauges.md` |
| Generative AI | `design_human-interface-guidelines_generative-ai.md` |
| Gestures | `design_human-interface-guidelines_gestures.md` |
| Getting started | `design_human-interface-guidelines_getting-started.md` |
| Going full screen | `design_human-interface-guidelines_going-full-screen.md` |
| Gyroscope and accelerometer | `design_human-interface-guidelines_gyro-and-accelerometer.md` |
| HealthKit | `design_human-interface-guidelines_healthkit.md` |
| Home Screen quick actions | `design_human-interface-guidelines_home-screen-quick-actions.md` |
| HomeKit | `design_human-interface-guidelines_homekit.md` |
| iCloud | `design_human-interface-guidelines_icloud.md` |
| Icons | `design_human-interface-guidelines_icons.md` |
| ID Verifier | `design_human-interface-guidelines_id-verifier.md` |
| Image views | `design_human-interface-guidelines_image-views.md` |
| Image wells | `design_human-interface-guidelines_image-wells.md` |
| Images | `design_human-interface-guidelines_images.md` |
| iMessage apps and stickers | `design_human-interface-guidelines_imessage-apps-and-stickers.md` |
| Immersive experiences | `design_human-interface-guidelines_immersive-experiences.md` |
| Inclusion | `design_human-interface-guidelines_inclusion.md` |
| Inputs | `design_human-interface-guidelines_inputs.md` |
| Keyboards | `design_human-interface-guidelines_keyboards.md` |
| Labels | `design_human-interface-guidelines_labels.md` |
| Launching | `design_human-interface-guidelines_launching.md` |
| Layout and organization | `design_human-interface-guidelines_layout-and-organization.md` |
| Layout | `design_human-interface-guidelines_layout.md` |
| Lists and tables | `design_human-interface-guidelines_lists-and-tables.md` |
| Live Activities | `design_human-interface-guidelines_live-activities.md` |
| Live Photos | `design_human-interface-guidelines_live-photos.md` |
| Live-viewing apps | `design_human-interface-guidelines_live-viewing-apps.md` |
| Loading | `design_human-interface-guidelines_loading.md` |
| Lockups | `design_human-interface-guidelines_lockups.md` |
| Mac Catalyst | `design_human-interface-guidelines_mac-catalyst.md` |
| Machine learning | `design_human-interface-guidelines_machine-learning.md` |
| Managing accounts | `design_human-interface-guidelines_managing-accounts.md` |
| Managing notifications | `design_human-interface-guidelines_managing-notifications.md` |
| Maps | `design_human-interface-guidelines_maps.md` |
| Materials | `design_human-interface-guidelines_materials.md` |
| Menus and actions | `design_human-interface-guidelines_menus-and-actions.md` |
| Menus | `design_human-interface-guidelines_menus.md` |
| Modality | `design_human-interface-guidelines_modality.md` |
| Motion | `design_human-interface-guidelines_motion.md` |
| Multitasking | `design_human-interface-guidelines_multitasking.md` |
| Navigation and search | `design_human-interface-guidelines_navigation-and-search.md` |
| Nearby interactions | `design_human-interface-guidelines_nearby-interactions.md` |
| NFC | `design_human-interface-guidelines_nfc.md` |
| Notifications | `design_human-interface-guidelines_notifications.md` |
| Offering help | `design_human-interface-guidelines_offering-help.md` |
| Onboarding | `design_human-interface-guidelines_onboarding.md` |
| Ornaments | `design_human-interface-guidelines_ornaments.md` |
| Outline views | `design_human-interface-guidelines_outline-views.md` |
| Page controls | `design_human-interface-guidelines_page-controls.md` |
| Panels | `design_human-interface-guidelines_panels.md` |
| Path controls | `design_human-interface-guidelines_path-controls.md` |
| Patterns | `design_human-interface-guidelines_patterns.md` |
| Photo editing | `design_human-interface-guidelines_photo-editing.md` |
| Pickers | `design_human-interface-guidelines_pickers.md` |
| Playing audio | `design_human-interface-guidelines_playing-audio.md` |
| Playing haptics | `design_human-interface-guidelines_playing-haptics.md` |
| Playing video | `design_human-interface-guidelines_playing-video.md` |
| Pointing devices | `design_human-interface-guidelines_pointing-devices.md` |
| Pop-up buttons | `design_human-interface-guidelines_pop-up-buttons.md` |
| Popovers | `design_human-interface-guidelines_popovers.md` |
| Presentation | `design_human-interface-guidelines_presentation.md` |
| Printing | `design_human-interface-guidelines_printing.md` |
| Privacy | `design_human-interface-guidelines_privacy.md` |
| Progress indicators | `design_human-interface-guidelines_progress-indicators.md` |
| Pull-down buttons | `design_human-interface-guidelines_pull-down-buttons.md` |
| Rating indicators | `design_human-interface-guidelines_rating-indicators.md` |
| Ratings and reviews | `design_human-interface-guidelines_ratings-and-reviews.md` |
| Remotes | `design_human-interface-guidelines_remotes.md` |
| ResearchKit | `design_human-interface-guidelines_researchkit.md` |
| Right to left | `design_human-interface-guidelines_right-to-left.md` |
| Scroll views | `design_human-interface-guidelines_scroll-views.md` |
| Search fields | `design_human-interface-guidelines_search-fields.md` |
| Searching | `design_human-interface-guidelines_searching.md` |
| Segmented controls | `design_human-interface-guidelines_segmented-controls.md` |
| Selection and input | `design_human-interface-guidelines_selection-and-input.md` |
| Settings | `design_human-interface-guidelines_settings.md` |
| SF Symbols | `design_human-interface-guidelines_sf-symbols.md` |
| SharePlay | `design_human-interface-guidelines_shareplay.md` |
| ShazamKit | `design_human-interface-guidelines_shazamkit.md` |
| Sheets | `design_human-interface-guidelines_sheets.md` |
| Sidebars | `design_human-interface-guidelines_sidebars.md` |
| Sign in with Apple | `design_human-interface-guidelines_sign-in-with-apple.md` |
| Siri | `design_human-interface-guidelines_siri.md` |
| Sliders | `design_human-interface-guidelines_sliders.md` |
| Snippets | `design_human-interface-guidelines_snippets.md` |
| Spatial layout | `design_human-interface-guidelines_spatial-layout.md` |
| Split views | `design_human-interface-guidelines_split-views.md` |
| Status bars | `design_human-interface-guidelines_status-bars.md` |
| Status | `design_human-interface-guidelines_status.md` |
| Steppers | `design_human-interface-guidelines_steppers.md` |
| System experiences | `design_human-interface-guidelines_system-experiences.md` |
| Tab bars | `design_human-interface-guidelines_tab-bars.md` |
| Tab views | `design_human-interface-guidelines_tab-views.md` |
| Tap to Pay on iPhone | `design_human-interface-guidelines_tap-to-pay-on-iphone.md` |
| Technologies | `design_human-interface-guidelines_technologies.md` |
| Text fields | `design_human-interface-guidelines_text-fields.md` |
| Text views | `design_human-interface-guidelines_text-views.md` |
| The menu bar | `design_human-interface-guidelines_the-menu-bar.md` |
| Toggles | `design_human-interface-guidelines_toggles.md` |
| Token fields | `design_human-interface-guidelines_token-fields.md` |
| Toolbars | `design_human-interface-guidelines_toolbars.md` |
| Top Shelf | `design_human-interface-guidelines_top-shelf.md` |
| Typography | `design_human-interface-guidelines_typography.md` |
| Undo and redo | `design_human-interface-guidelines_undo-and-redo.md` |
| Virtual keyboards | `design_human-interface-guidelines_virtual-keyboards.md` |
| VoiceOver | `design_human-interface-guidelines_voiceover.md` |
| Wallet | `design_human-interface-guidelines_wallet.md` |
| Watch faces | `design_human-interface-guidelines_watch-faces.md` |
| Web views | `design_human-interface-guidelines_web-views.md` |
| Widgets | `design_human-interface-guidelines_widgets.md` |
| Windows | `design_human-interface-guidelines_windows.md` |
| Workouts | `design_human-interface-guidelines_workouts.md` |
| Writing | `design_human-interface-guidelines_writing.md` |
| Human Interface Guidelines | `index.md` |