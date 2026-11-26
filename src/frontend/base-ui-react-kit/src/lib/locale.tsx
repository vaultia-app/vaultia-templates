'use client';

import * as React from 'react';
import type { Locale as DateFnsLocale } from 'date-fns';
import { enUS, vi as viDateLocale } from 'date-fns/locale';

import { numberToVietnameseWords } from '@workspace/ui/lib/number-to-words-vi';

/**
 * Every user-facing string the kit renders by default.
 * Components read these through `useUiLocale()`; a prop passed to a component always wins.
 */
export interface UiMessages {
  pagination: { previous: string; previousPage: string; next: string; nextPage: string; morePages: string };
  copyButton: { copy: string; copied: string };
  numberInput: { decrease: string; increase: string };
  datePicker: {
    placeholder: string;
    clear: string;
    rangePlaceholder: string;
    rangeClear: string;
    rangeFrom: (date: string) => string;
  };
  monthPicker: {
    placeholder: string;
    clear: string;
    previousYear: string;
    nextYear: string;
    monthsOfYear: (year: number) => string;
    month: (month: number) => string;
    selected: (month: number, year: number) => string;
  };
  timePicker: {
    placeholder: string;
    clear: string;
    title: string;
    hours: string;
    minutes: string;
    quickPicks: string;
    presets: { label: string; value: string }[];
  };
  dateTimePicker: {
    placeholder: string;
    clear: string;
    time: string;
    hours: string;
    minutes: string;
    now: string;
    confirm: string;
  };
  currencyInput: { placeholder: string; clear: string; quickPick: string; inWords: string };
  fileUpload: {
    onlyOne: string;
    tooMany: (max: number) => string;
    tooLarge: (name: string, maxSize: string) => string;
    dropzone: string;
    browse: string;
    accepted: (accept: string) => string;
    maxSize: (size: string) => string;
    maxFiles: (max: number) => string;
    remove: (name: string) => string;
  };
  commandDialog: { title: string };
  notifications: {
    trigger: (unread: number) => string;
    title: string;
    newCount: (count: number) => string;
    allRead: string;
    markAllRead: string;
    all: (count: number) => string;
    unread: (count: number) => string;
    emptyUnread: string;
    empty: string;
    emptyHint: string;
    unreadDot: string;
    remove: string;
    close: string;
  };
}

export interface UiLocale {
  /** BCP 47 tag used for `Intl` formatting, for example `en-US` or `vi-VN`. */
  code: string;
  /** date-fns locale for formatting dates and the calendar. */
  dateLocale: DateFnsLocale;
  /** Default currency symbol for `CurrencyInput`. */
  currency: string;
  /** Optional formatter that reads an amount in words (shown by `CurrencyInput showWords`). */
  amountInWords?: (amount: number) => string;
  messages: UiMessages;
}

const pad = (value: number) => String(value).padStart(2, '0');

export const en: UiLocale = {
  code: 'en-US',
  dateLocale: enUS,
  currency: '$',
  messages: {
    pagination: {
      previous: 'Previous',
      previousPage: 'Go to previous page',
      next: 'Next',
      nextPage: 'Go to next page',
      morePages: 'More pages'
    },
    copyButton: { copy: 'Copy', copied: 'Copied!' },
    numberInput: { decrease: 'Decrease value', increase: 'Increase value' },
    datePicker: {
      placeholder: 'Pick a date...',
      clear: 'Clear date',
      rangePlaceholder: 'Pick a date range...',
      rangeClear: 'Clear date range',
      rangeFrom: (date) => `From ${date}`
    },
    monthPicker: {
      placeholder: 'Pick a month...',
      clear: 'Clear month',
      previousYear: 'Previous year',
      nextYear: 'Next year',
      monthsOfYear: (year) => `Months of ${year}`,
      month: (month) => new Date(2000, month - 1, 1).toLocaleString('en-US', { month: 'short' }),
      selected: (month, year) => `${pad(month)}/${year}`
    },
    timePicker: {
      placeholder: 'Pick a time...',
      clear: 'Clear time',
      title: 'Select time',
      hours: 'Hour',
      minutes: 'Minute',
      quickPicks: 'Quick picks',
      presets: [
        { label: '08:00 (Morning)', value: '08:00' },
        { label: '10:00 (Morning)', value: '10:00' },
        { label: '12:00 (Noon)', value: '12:00' },
        { label: '14:30 (Afternoon)', value: '14:30' },
        { label: '17:00 (Afternoon)', value: '17:00' },
        { label: '19:30 (Evening)', value: '19:30' }
      ]
    },
    dateTimePicker: {
      placeholder: 'Pick a date and time...',
      clear: 'Clear date and time',
      time: 'Time',
      hours: 'Hour',
      minutes: 'Minute',
      now: 'Now',
      confirm: 'Done'
    },
    currencyInput: {
      placeholder: 'Enter an amount...',
      clear: 'Clear amount',
      quickPick: 'Quick pick:',
      inWords: 'In words:'
    },
    fileUpload: {
      onlyOne: 'Only one file can be selected',
      tooMany: (max) => `You can upload up to ${max} files`,
      tooLarge: (name, maxSize) => `"${name}" is larger than the ${maxSize} limit`,
      dropzone: 'Drag and drop files here or',
      browse: 'browse your device',
      accepted: (accept) => `Accepted: ${accept}`,
      maxSize: (size) => `Up to ${size}`,
      maxFiles: (max) => `(up to ${max} files)`,
      remove: (name) => `Remove ${name}`
    },
    commandDialog: { title: 'Command menu' },
    notifications: {
      trigger: (unread) => `Notifications (${unread} unread)`,
      title: 'Notifications',
      newCount: (count) => `${count} new`,
      allRead: 'All caught up',
      markAllRead: 'Mark all as read',
      all: (count) => `All (${count})`,
      unread: (count) => `Unread (${count})`,
      emptyUnread: 'No unread notifications',
      empty: 'No notifications yet',
      emptyHint: 'New notifications will show up here.',
      unreadDot: 'Unread',
      remove: 'Remove this notification',
      close: 'Close notifications'
    }
  }
};

export const vi: UiLocale = {
  code: 'vi-VN',
  dateLocale: viDateLocale,
  currency: '₫',
  amountInWords: numberToVietnameseWords,
  messages: {
    pagination: {
      previous: 'Trước',
      previousPage: 'Trang trước',
      next: 'Sau',
      nextPage: 'Trang tiếp',
      morePages: 'Nhiều trang hơn'
    },
    copyButton: { copy: 'Sao chép', copied: 'Đã sao chép!' },
    numberInput: { decrease: 'Giảm giá trị', increase: 'Tăng giá trị' },
    datePicker: {
      placeholder: 'Chọn ngày...',
      clear: 'Xóa chọn ngày',
      rangePlaceholder: 'Chọn khoảng thời gian...',
      rangeClear: 'Xóa khoảng ngày',
      rangeFrom: (date) => `Từ ${date}`
    },
    monthPicker: {
      placeholder: 'Chọn tháng...',
      clear: 'Xóa chọn tháng',
      previousYear: 'Năm trước',
      nextYear: 'Năm sau',
      monthsOfYear: (year) => `Các tháng năm ${year}`,
      month: (month) => `Th ${month}`,
      selected: (month, year) => `Tháng ${pad(month)}/${year}`
    },
    timePicker: {
      placeholder: 'Chọn giờ:phút...',
      clear: 'Xóa giờ',
      title: 'Chọn thời gian',
      hours: 'Giờ',
      minutes: 'Phút',
      quickPicks: 'Khung giờ nhanh',
      presets: [
        { label: '08:00 (Sáng)', value: '08:00' },
        { label: '10:00 (Sáng)', value: '10:00' },
        { label: '12:00 (Trưa)', value: '12:00' },
        { label: '14:30 (Chiều)', value: '14:30' },
        { label: '17:00 (Chiều)', value: '17:00' },
        { label: '19:30 (Tối)', value: '19:30' }
      ]
    },
    dateTimePicker: {
      placeholder: 'Chọn ngày & giờ...',
      clear: 'Xóa ngày giờ',
      time: 'Thời gian',
      hours: 'Giờ',
      minutes: 'Phút',
      now: 'Hiện tại',
      confirm: 'Xác nhận'
    },
    currencyInput: {
      placeholder: 'Nhập số tiền...',
      clear: 'Xóa số tiền',
      quickPick: 'Chọn nhanh:',
      inWords: 'Bằng chữ:'
    },
    fileUpload: {
      onlyOne: 'Chỉ được chọn 1 file duy nhất',
      tooMany: (max) => `Chỉ được tải lên tối đa ${max} file`,
      tooLarge: (name, maxSize) => `File "${name}" vượt quá kích thước cho phép (${maxSize})`,
      dropzone: 'Kéo thả file vào đây hoặc',
      browse: 'chọn từ thiết bị',
      accepted: (accept) => `Hỗ trợ: ${accept}`,
      maxSize: (size) => `Tối đa ${size}`,
      maxFiles: (max) => `(Tối đa ${max} file)`,
      remove: (name) => `Xóa file ${name}`
    },
    commandDialog: { title: 'Tìm kiếm nhanh' },
    notifications: {
      trigger: (unread) => `Thông báo (${unread} chưa đọc)`,
      title: 'Thông báo',
      newCount: (count) => `${count} mới`,
      allRead: 'Đã xem hết',
      markAllRead: 'Đọc tất cả',
      all: (count) => `Tất cả (${count})`,
      unread: (count) => `Chưa đọc (${count})`,
      emptyUnread: 'Không có thông báo chưa đọc',
      empty: 'Chưa có thông báo nào',
      emptyHint: 'Thông báo mới sẽ hiển thị tại đây.',
      unreadDot: 'Chưa đọc',
      remove: 'Xóa thông báo này',
      close: 'Đóng danh sách thông báo'
    }
  }
};

export const UI_LOCALES = { en, vi } as const;
export type UiLocaleName = keyof typeof UI_LOCALES;

const UiLocaleContext = React.createContext<UiLocale>(en);

export interface UiLocaleProviderProps {
  /** A built-in locale name (`'en'`, `'vi'`) or a custom `UiLocale`. Defaults to `'en'`. */
  locale?: UiLocaleName | UiLocale;
  children: React.ReactNode;
}

/** Sets the language, date locale, and currency defaults for every kit component below it. */
export function UiLocaleProvider({ locale = 'en', children }: UiLocaleProviderProps) {
  const value = typeof locale === 'string' ? UI_LOCALES[locale] : locale;
  return <UiLocaleContext.Provider value={value}>{children}</UiLocaleContext.Provider>;
}

/** The active UI locale. Works without a provider (falls back to `en`). */
export function useUiLocale(): UiLocale {
  return React.useContext(UiLocaleContext);
}
