import { test, expect } from '@playwright/test';

test.describe('Navigasi utama', () => {
  test('beranda menampilkan judul sekolah', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SMK Bina Karya Nusantara/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'SMK Bina Karya Nusantara',
    );
  });

  test('halaman profil dapat diakses', async ({ page }) => {
    await page.goto('/profil');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Profil Sekolah');
  });

  test('daftar program keahlian menampilkan 6 jurusan', async ({ page }) => {
    await page.goto('/program-keahlian');
    const kartu = page.locator('main a[href^="/program-keahlian/"]');
    await expect(kartu).toHaveCount(6);
  });

  test('detail jurusan RPL menampilkan kompetensi', async ({ page }) => {
    await page.goto('/program-keahlian/rekayasa-perangkat-lunak');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Rekayasa Perangkat Lunak',
    );
    await expect(page.getByText('Kompetensi yang Dipelajari')).toBeVisible();
  });

  test('halaman PPDB menampilkan catatan tanpa form pendaftaran', async ({ page }) => {
    await page.goto('/ppdb');
    await expect(page.getByText('Penting:')).toBeVisible();
    await expect(page.locator('form')).toHaveCount(0);
  });

  test('halaman kontak menampilkan alamat', async ({ page }) => {
    await page.goto('/kontak');
    await expect(page.getByText('Alamat')).toBeVisible();
  });
});

test.describe('Pencarian', () => {
  test('mencari jurusan melalui dialog pencarian', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Buka pencarian' }).click();
    await page.getByLabel('Kata kunci pencarian').fill('jaringan');
    const dialog = page.getByRole('dialog');
    await expect(
      dialog.getByRole('link', { name: /Teknik Komputer dan Jaringan/ }).first(),
    ).toBeVisible();
  });
});

test.describe('Aksesibilitas dasar', () => {
  test('punya skip link dan satu h1', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Lewati ke konten utama' })).toBeAttached();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });
});
