if (!self.define) {
  let e,
    s = {};
  const i = (i, c) => (
    (i = new URL(i + ".js", c).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let n = {};
    const o = (e) => i(e, r),
      d = { module: { uri: r }, exports: n, require: o };
    s[r] = Promise.all(c.map((e) => d[e] || o(e))).then((e) => (a(...e), n));
  };
}
define(["./workbox-07a7b4f2"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "12a46ed286d6427a5ef0a09530b5dea5",
        },
        {
          url: "/_next/static/chunks/078dd349-5c22e17a87b0f24e.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/116-0b26794f83915c72.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/279-0ea6edf194e8982d.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/312-148970e6dca35a00.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/329-f2777db26f38e259.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/356-dffe780a588bc597.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/734-8f554ebb1cc16916.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/882-9edff034c92f38bd.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/938-e4f3a73429b5905a.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/(auth)/signin/page-4c00a7594bb87c0c.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/(auth)/signup/page-fdea81d12e61583c.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/_not-found-ce587ea4f2a3e050.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/all-notes/%5Bnote%5D/page-1762660bf0b2e8cb.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/all-notes/layout-623436c90f0d485d.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/all-notes/page-862b47afee9ca488.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/archived/%5Bnote%5D/page-6109b3164a750f8e.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/archived/layout-1dc6af8574f6bbba.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/archived/page-104cc22e0b2d6dc4.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/create/page-e55f68c6a8ccba2c.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/favorites/%5Bnote%5D/page-c588a4e0861daaeb.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/favorites/layout-0de0c22102b00c65.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/favorites/page-b03a222f910c4510.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/layout-dff3aa1771f4ee59.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/note/%5Bnote%5D/page-714164deee181fb5.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-20a94e8863639b44.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/recently-deleted/%5Bnote%5D/page-229a4d19ceb4aed8.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/recently-deleted/layout-3c8823ee76f0ea54.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/dashboard/recently-deleted/page-bbebe362715405d5.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/layout-7a939469ed627ecc.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/loading-9bc002f4a9be4cc9.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/app/page-2a7632b7f0891574.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/bc9e92e6-a2d3422cd78c9e12.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/fd9d1056-08dc980ab50c330a.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/framework-8883d1e9be70c3da.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/main-32ca024c7f05fad3.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/main-app-bca316baa6aacb10.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-a15ef20501193704.js",
          revision: "s_fljMTdnNCP5_UKV7-Ps",
        },
        {
          url: "/_next/static/css/d71fb152f91ae797.css",
          revision: "d71fb152f91ae797",
        },
        {
          url: "/_next/static/css/fb9a9af3f6f81ba5.css",
          revision: "fb9a9af3f6f81ba5",
        },
        {
          url: "/_next/static/media/AeonikTRIAL-Bold.99f5e52c.otf",
          revision: "99f5e52c",
        },
        {
          url: "/_next/static/media/AeonikTRIAL-Regular.a982720e.otf",
          revision: "a982720e",
        },
        {
          url: "/_next/static/media/Matter-Regular.e2e63e84.ttf",
          revision: "e2e63e84",
        },
        {
          url: "/_next/static/media/Matter-SemiBold.c79a8fcc.ttf",
          revision: "c79a8fcc",
        },
        {
          url: "/_next/static/s_fljMTdnNCP5_UKV7-Ps/_buildManifest.js",
          revision: "a1b7599199e2e8c82f2c6bcf8d8aca61",
        },
        {
          url: "/_next/static/s_fljMTdnNCP5_UKV7-Ps/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-Bold.otf",
          revision: "c62e7a45950ffb9009388facbdc53cb3",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-BoldItalic.otf",
          revision: "bcfac77226ce3bfa7d160f7089217a83",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-Light.otf",
          revision: "9273ff290be490993a7ea85ed65dbea2",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-LightItalic.otf",
          revision: "5e38542d92d278309b926354f3e9dd34",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-Regular.otf",
          revision: "fc7dcdbbfd339d1d810345a43751054d",
        },
        {
          url: "/fonts/Aeonik/AeonikTRIAL-RegularItalic.otf",
          revision: "27ac158d4c9ce33bee35f0fd5fa45440",
        },
        {
          url: "/fonts/Aeonik/CoType-EULA-Trial.pdf",
          revision: "d744ed3b770e2db6f5b9c5d4ea6f2760",
        },
        {
          url: "/fonts/matter/Matter-Bold.ttf",
          revision: "4bf89b8de7f6729575fc3217e35c1a69",
        },
        {
          url: "/fonts/matter/Matter-BoldItalic.ttf",
          revision: "0dedf5dc0842faa7f59b0c8c71a2db2e",
        },
        {
          url: "/fonts/matter/Matter-Heavy.ttf",
          revision: "ca6a95b4f38431617a5702f93b65f0a7",
        },
        {
          url: "/fonts/matter/Matter-HeavyItalic.ttf",
          revision: "e570b8a51d547d3ee3fd262c9b4cb244",
        },
        {
          url: "/fonts/matter/Matter-Light.ttf",
          revision: "eac2bf7761a4a122793cc94bea393a3c",
        },
        {
          url: "/fonts/matter/Matter-LightItalic.ttf",
          revision: "c2c8a8463c284433e6afdf8366366574",
        },
        {
          url: "/fonts/matter/Matter-Medium.ttf",
          revision: "5cb4b2a03a86b1872deca6ea58afe87f",
        },
        {
          url: "/fonts/matter/Matter-MediumItalic.ttf",
          revision: "3583451d5ba41549e6a47017882b3cd0",
        },
        {
          url: "/fonts/matter/Matter-Regular.ttf",
          revision: "3850dee650df105fd3c4bf7e19a576a1",
        },
        {
          url: "/fonts/matter/Matter-RegularItalic.ttf",
          revision: "d6331231723fd9048f91731761a1c446",
        },
        {
          url: "/fonts/matter/Matter-SemiBold.ttf",
          revision: "0f46545044644a5dedb4922ffbc8d7f3",
        },
        {
          url: "/fonts/matter/Matter-SemiBoldItalic.ttf",
          revision: "b770a0038529684cbd42d976c6ec0271",
        },
        {
          url: "/icons/Frame 238484.svg",
          revision: "38f00259a02ce0c06f6285c0e086f7c4",
        },
        {
          url: "/icons/Heading.svg",
          revision: "b85232b0adc5f0d74a75f62f619ed8dd",
        },
        {
          url: "/icons/Text-1.svg",
          revision: "18ac8dc0203a78ef5d4084ec40640e4a",
        },
        {
          url: "/icons/Text.svg",
          revision: "3219c3152ff8e62cb1f83fed1f764ff4",
        },
        {
          url: "/icons/activity-heart.svg",
          revision: "0641de8145c8ce98e5791686bd1627db",
        },
        {
          url: "/icons/activity.svg",
          revision: "22737d4d99d5861d6c27ef65289d1af5",
        },
        {
          url: "/icons/airplay.svg",
          revision: "0f4aa8774dada704803c70ae4eed247d",
        },
        {
          url: "/icons/airpods.svg",
          revision: "d7f827896e16a47f75b34f668e0cdd88",
        },
        {
          url: "/icons/alarm-clock-check.svg",
          revision: "aab75b84dce759e9fd1308e5c3c58e5a",
        },
        {
          url: "/icons/alarm-clock-minus.svg",
          revision: "238e40ffac5c7d308a258d78bfea30c2",
        },
        {
          url: "/icons/alarm-clock-off.svg",
          revision: "ca37be721d49f1bf7c43be13dc897441",
        },
        {
          url: "/icons/alarm-clock-plus.svg",
          revision: "0da92d05fbd2c3a7bafc5b5de45338f8",
        },
        {
          url: "/icons/alarm-clock.svg",
          revision: "6e567224321f280e96f69f32d36fb512",
        },
        {
          url: "/icons/alert-circle.svg",
          revision: "e6a3937860ae9966261bbbebaac79b6a",
        },
        {
          url: "/icons/alert-hexagon.svg",
          revision: "f7e4ad41cb5a2279b2912f1679b7dbea",
        },
        {
          url: "/icons/alert-octagon.svg",
          revision: "f4bca8c22f2c8438e8183de636fe2575",
        },
        {
          url: "/icons/alert-square.svg",
          revision: "b974464b5eb97f40d4b09c0dcf717f23",
        },
        {
          url: "/icons/alert-triangle.svg",
          revision: "de8da35a677f7bbb5025ba7a4d1e8cda",
        },
        {
          url: "/icons/align-bottom-01.svg",
          revision: "9955c4babefa4fb617822049d509e029",
        },
        {
          url: "/icons/align-bottom-02.svg",
          revision: "067eeffe0a76e54f343b633767f38d85",
        },
        {
          url: "/icons/align-center.svg",
          revision: "ec9d1ed75097559193431e30c3a336a7",
        },
        {
          url: "/icons/align-horizontal-centre-01.svg",
          revision: "e82e115ce1fd0b7781787b822e43e144",
        },
        {
          url: "/icons/align-horizontal-centre-02.svg",
          revision: "e0e91b4e8ef4f6508e3b94a16b5174d9",
        },
        {
          url: "/icons/align-justify.svg",
          revision: "b28b8398b393eb54f09dd0e45215bcc2",
        },
        {
          url: "/icons/align-left-01.svg",
          revision: "7a7fbdec51cd93b4c9081941a9b50ecf",
        },
        {
          url: "/icons/align-left-02.svg",
          revision: "64c5b103ae2b661927782cb28aa24d53",
        },
        {
          url: "/icons/align-left.svg",
          revision: "61fb05e1f3cc22157b92b6ca601de2a1",
        },
        {
          url: "/icons/align-right-01.svg",
          revision: "85d8b9f690cd986e4036f3a59c57f390",
        },
        {
          url: "/icons/align-right-02.svg",
          revision: "63b26ccf563f841826f14fda7aa11f32",
        },
        {
          url: "/icons/align-right.svg",
          revision: "3f96a3383eacec0fea97f5fe2d95c0a6",
        },
        {
          url: "/icons/align-top-arrow-01.svg",
          revision: "be216a2c637388cf2f0abf336de32e1a",
        },
        {
          url: "/icons/align-top-arrow-02.svg",
          revision: "6148fb2f5e3ea31030290a38fd3e43f4",
        },
        {
          url: "/icons/align-vertical-center-01.svg",
          revision: "37307a1c3b96b805a53b1db15ae71539",
        },
        {
          url: "/icons/align-vertical-center-02.svg",
          revision: "1bded1d02458521b9448cc384ac83dd5",
        },
        {
          url: "/icons/anchor.svg",
          revision: "78224b96996de63356cd8492d8bef400",
        },
        {
          url: "/icons/annotation-alert.svg",
          revision: "ce192dd32b9796f650d6a9469c67091c",
        },
        {
          url: "/icons/annotation-check.svg",
          revision: "478f81677f496854de60c5cd1422bcf0",
        },
        {
          url: "/icons/annotation-dots.svg",
          revision: "85a23daa90eb7cb00e3dd1ca1119abb7",
        },
        {
          url: "/icons/annotation-heart.svg",
          revision: "a853713265ee081dd21c7c9f18ab8d9a",
        },
        {
          url: "/icons/annotation-info.svg",
          revision: "20ddaeb35a1e4bb7e837d104332b3af8",
        },
        {
          url: "/icons/annotation-plus.svg",
          revision: "dcf2f3077888ca117be838b4472cc3af",
        },
        {
          url: "/icons/annotation-question.svg",
          revision: "b4b6fbac7cc3dbdbfa600e77b8b6d071",
        },
        {
          url: "/icons/annotation-x.svg",
          revision: "0336d5836ce20697e45ff180e9c68a8f",
        },
        {
          url: "/icons/annotation.svg",
          revision: "f5ef3ce03d222dc76deae4e595e47099",
        },
        {
          url: "/icons/announcement-01.svg",
          revision: "72b64b319808aba34650d07524ceaada",
        },
        {
          url: "/icons/announcement-02.svg",
          revision: "433582f003217da35b9ae029c776a74b",
        },
        {
          url: "/icons/announcement-03.svg",
          revision: "281cd46a14276898db7c7ff1a8594212",
        },
        {
          url: "/icons/archive.svg",
          revision: "e5640c7aeb40b88f7ae976332199d544",
        },
        {
          url: "/icons/arrow-block-down.svg",
          revision: "8f40e8c6704800f49abc89fd0256bb05",
        },
        {
          url: "/icons/arrow-block-left.svg",
          revision: "3184f42b0229b1e7096a1e42cc68b1b0",
        },
        {
          url: "/icons/arrow-block-right.svg",
          revision: "0bb2c4c24ff1fb5a8b03c91a77351a29",
        },
        {
          url: "/icons/arrow-block-up.svg",
          revision: "3b5b2e0c2f790a79e74827fbcbb78055",
        },
        {
          url: "/icons/arrow-circle-broken-down-left.svg",
          revision: "bc7bdc2eeac009b376800c1df6e0eecc",
        },
        {
          url: "/icons/arrow-circle-broken-down-right.svg",
          revision: "f87a842765866a63cb5fce84c13be467",
        },
        {
          url: "/icons/arrow-circle-broken-down.svg",
          revision: "6e3259dedbcf070a8deadeb76b0546c6",
        },
        {
          url: "/icons/arrow-circle-broken-left.svg",
          revision: "6afd4672ed41971b414c25f7380d00e5",
        },
        {
          url: "/icons/arrow-circle-broken-right.svg",
          revision: "25e726c8220c252b42753c17a7d5323f",
        },
        {
          url: "/icons/arrow-circle-broken-up-left.svg",
          revision: "42a6d8e6ac02ef45374d5f36cf1bdb07",
        },
        {
          url: "/icons/arrow-circle-broken-up-right.svg",
          revision: "31679118e04adb1106a7006291d2d0a6",
        },
        {
          url: "/icons/arrow-circle-broken-up.svg",
          revision: "13686f8c498a9c49128a98f4e41a9356",
        },
        {
          url: "/icons/arrow-circle-down-left.svg",
          revision: "e2d20cd72506c25c2cd3c6084e99f13b",
        },
        {
          url: "/icons/arrow-circle-down-right.svg",
          revision: "2423b79aaa802e3554d88b33d56a5da7",
        },
        {
          url: "/icons/arrow-circle-down.svg",
          revision: "cbe82f75bd247f2f18fc7feb609711b4",
        },
        {
          url: "/icons/arrow-circle-left.svg",
          revision: "65f9e0dd5f81a03a7fef8e0419d57bc4",
        },
        {
          url: "/icons/arrow-circle-right.svg",
          revision: "a8d047852bb7817f770bf484c5bb2517",
        },
        {
          url: "/icons/arrow-circle-up-left.svg",
          revision: "a492450f9634f2f1e59376416ec81af5",
        },
        {
          url: "/icons/arrow-circle-up-right.svg",
          revision: "92f4c9c9aa92228a56f3bafeceb3a1be",
        },
        {
          url: "/icons/arrow-circle-up.svg",
          revision: "89842d2062f39c8309cbc08c8d38040a",
        },
        {
          url: "/icons/arrow-down-left.svg",
          revision: "216ea0b29e268bab9cf9a098880f78a1",
        },
        {
          url: "/icons/arrow-down-right.svg",
          revision: "dd96479281dbf0a0f7546f02f05307fe",
        },
        {
          url: "/icons/arrow-down.svg",
          revision: "187c8e973487f250390566ba002c6171",
        },
        {
          url: "/icons/arrow-left.svg",
          revision: "b853b9e5740b6144003243afee847daf",
        },
        {
          url: "/icons/arrow-narrow-down-left.svg",
          revision: "1ab577f6cf0a53b1572bc728cf8ab3b0",
        },
        {
          url: "/icons/arrow-narrow-down-right.svg",
          revision: "908451701bd36e7e26c7f969d90f5dd8",
        },
        {
          url: "/icons/arrow-narrow-down.svg",
          revision: "05ee10c19a7bc57bab6be48f85380921",
        },
        {
          url: "/icons/arrow-narrow-left.svg",
          revision: "41366119173c65840cc346368a0e9650",
        },
        {
          url: "/icons/arrow-narrow-right.svg",
          revision: "351a0e007634d412b86189ad03502141",
        },
        {
          url: "/icons/arrow-narrow-up-left.svg",
          revision: "4dc7c994a91c19ddc568e03d73f2c285",
        },
        {
          url: "/icons/arrow-narrow-up-right.svg",
          revision: "00f0e151d9048b63acf3997b2fd2b87e",
        },
        {
          url: "/icons/arrow-narrow-up.svg",
          revision: "ec3df0222738e1aff79f4a00b008d053",
        },
        {
          url: "/icons/arrow-right.svg",
          revision: "1bdc1b776e951ed1acf6c32d44e6196e",
        },
        {
          url: "/icons/arrow-square-down-left.svg",
          revision: "e13cccc9222bd3f0abe4b943c8c55635",
        },
        {
          url: "/icons/arrow-square-down-right.svg",
          revision: "587bf2dec5ec2732fc4ed15ac1f81f64",
        },
        {
          url: "/icons/arrow-square-down.svg",
          revision: "24cd4a736a933efbef8d2362f57186d6",
        },
        {
          url: "/icons/arrow-square-left.svg",
          revision: "9d3486a850edcfef91ffa511540272d2",
        },
        {
          url: "/icons/arrow-square-right.svg",
          revision: "020f0bfe388e862a83d0262282644a40",
        },
        {
          url: "/icons/arrow-square-up-left.svg",
          revision: "a267ef813cd2e8e1724e869b5846f3fc",
        },
        {
          url: "/icons/arrow-square-up-right.svg",
          revision: "cf8633bc8cf778125efd2e9a17dd567d",
        },
        {
          url: "/icons/arrow-square-up.svg",
          revision: "1e2e5aa292415e4f04f923f8ded89b55",
        },
        {
          url: "/icons/arrow-up-left.svg",
          revision: "04082d31f0609f03d81c200fa470d3ba",
        },
        {
          url: "/icons/arrow-up-right.svg",
          revision: "067fc19715e0caf7fa1916e9ac74c590",
        },
        {
          url: "/icons/arrow-up.svg",
          revision: "99918033b9baa12725f4134ff8d59c9f",
        },
        {
          url: "/icons/arrows-down.svg",
          revision: "4e007dbafc687adbe2f75bd6ddb20d62",
        },
        {
          url: "/icons/arrows-left.svg",
          revision: "65ce07ac5561b323176ec535db41a426",
        },
        {
          url: "/icons/arrows-right.svg",
          revision: "3cc3c7a469605da86a6762575ed4aee3",
        },
        {
          url: "/icons/arrows-triangle.svg",
          revision: "d418a122a7d292f3eeea623feec0f2f9",
        },
        {
          url: "/icons/arrows-up.svg",
          revision: "c6deb96f6bcac7618f1c764928af61b9",
        },
        {
          url: "/icons/asterisk-01.svg",
          revision: "f88b2fddc457225fdbc9538d19469a7e",
        },
        {
          url: "/icons/asterisk-02.svg",
          revision: "4af4d2eaf0c501dbd022ec63fc2b7158",
        },
        {
          url: "/icons/at-sign.svg",
          revision: "cedb4960d18f66104c23ee5555c95c2f",
        },
        {
          url: "/icons/atom-01.svg",
          revision: "72845c8df4e1f12301da40d46f3e3e0a",
        },
        {
          url: "/icons/atom-02.svg",
          revision: "6702963b9a8baae2470c2ec3acb08785",
        },
        {
          url: "/icons/attachment-01.svg",
          revision: "e5bc948320f877a7f39458d7f14dfee7",
        },
        {
          url: "/icons/attachment-02.svg",
          revision: "644ae5ce04e32c5e0cb70b5c51432739",
        },
        {
          url: "/icons/award-01.svg",
          revision: "58f10fa97f5c4c9ccc8c8b7e03d1efd1",
        },
        {
          url: "/icons/award-02.svg",
          revision: "4802028d6552f4c5ea0f09988e4443cf",
        },
        {
          url: "/icons/award-03.svg",
          revision: "c436c04b49907b039e1ae841b2b3963c",
        },
        {
          url: "/icons/award-04.svg",
          revision: "218a71991bf010a4bcc2be93a7ba6f58",
        },
        {
          url: "/icons/award-05.svg",
          revision: "730c31b2472e8d169ba932c4f4aa31ac",
        },
        {
          url: "/icons/backpack.svg",
          revision: "63a469697cd90a770b46daa2f811e54d",
        },
        {
          url: "/icons/bank-note-01.svg",
          revision: "47fe0dd057dc31b405d3a8c5c5ae3348",
        },
        {
          url: "/icons/bank-note-02.svg",
          revision: "5972d83460c1ca5a4bac62a035aeb29b",
        },
        {
          url: "/icons/bank-note-03.svg",
          revision: "ff82ad2b831fe1d829f859b28cabe443",
        },
        {
          url: "/icons/bank.svg",
          revision: "e91ff3640ea3c50f943ff58f971dfdc8",
        },
        {
          url: "/icons/bar-chart-01.svg",
          revision: "db31ade1ac7e01bbe011457d9a967b47",
        },
        {
          url: "/icons/bar-chart-02.svg",
          revision: "71f5ef6f7cef4b61bd4716bfd1994f62",
        },
        {
          url: "/icons/bar-chart-03.svg",
          revision: "bb456ee1dff05c99496f7f9f0fc68a60",
        },
        {
          url: "/icons/bar-chart-04.svg",
          revision: "2425bbd02770b378aeaec3c5b8d27ceb",
        },
        {
          url: "/icons/bar-chart-05.svg",
          revision: "54c9eb1870edddf8821995478f221dea",
        },
        {
          url: "/icons/bar-chart-06.svg",
          revision: "a3d69de71b500dc2fbfdeb90e31ad9aa",
        },
        {
          url: "/icons/bar-chart-07.svg",
          revision: "f213f8254c6f27a56376758372c516bf",
        },
        {
          url: "/icons/bar-chart-08.svg",
          revision: "44636c6eade05927ef844abd3cacaa66",
        },
        {
          url: "/icons/bar-chart-09.svg",
          revision: "62d34959825b6faa1c99f84d1b563a27",
        },
        {
          url: "/icons/bar-chart-10.svg",
          revision: "f84c088995270e713cb4e8299525dbb1",
        },
        {
          url: "/icons/bar-chart-11.svg",
          revision: "13cef71d7e8d6684ebc50624f7e4adbe",
        },
        {
          url: "/icons/bar-chart-12.svg",
          revision: "22db615ab6f7406f3b10c29d9b5c85e6",
        },
        {
          url: "/icons/bar-chart-circle-01.svg",
          revision: "db02efa5a1cd43ae6062b50859663b1c",
        },
        {
          url: "/icons/bar-chart-circle-02.svg",
          revision: "34d0d0515ed68cbe72043e7e521dee67",
        },
        {
          url: "/icons/bar-chart-circle-03.svg",
          revision: "2fa7ee16da43b86a3c4c88cca8f2e3aa",
        },
        {
          url: "/icons/bar-chart-square-01.svg",
          revision: "c00e59609e74dfff7b26b2024db901fc",
        },
        {
          url: "/icons/bar-chart-square-02.svg",
          revision: "6309fba2f39e7195fab02ae2d90a9eff",
        },
        {
          url: "/icons/bar-chart-square-03.svg",
          revision: "f6ab81fc0bed7e72dc1dd2feb844701d",
        },
        {
          url: "/icons/bar-chart-square-down.svg",
          revision: "f9b689375a84f39eeda427f7502033b6",
        },
        {
          url: "/icons/bar-chart-square-minus.svg",
          revision: "0e4993578da8b084a1e3acc8cdac60f4",
        },
        {
          url: "/icons/bar-chart-square-plus.svg",
          revision: "a6c2a7718d2e1e95c528ba391ef65c63",
        },
        {
          url: "/icons/bar-chart-square-up.svg",
          revision: "71e22165fcc730a77ee077f51c2fd389",
        },
        {
          url: "/icons/bar-line-chart.svg",
          revision: "950e8746ddd7f77ecbf4b32bdae67a4d",
        },
        {
          url: "/icons/battery-charging-01.svg",
          revision: "ecabf3417d3502cdd2ef0d9e6d7d15de",
        },
        {
          url: "/icons/battery-charging-02.svg",
          revision: "273eee32185c68429ecc50514d30ef80",
        },
        {
          url: "/icons/battery-empty.svg",
          revision: "1c71f134ba11e0391a6cc12edb9279a4",
        },
        {
          url: "/icons/battery-full.svg",
          revision: "64a6e45de852cc33c142367ccde08c52",
        },
        {
          url: "/icons/battery-low.svg",
          revision: "f5710f1d5122f4e5cfb7b1934f3d11c2",
        },
        {
          url: "/icons/battery-mid.svg",
          revision: "0ac6a9cac47727ed85ec1828393a31de",
        },
        {
          url: "/icons/beaker-01.svg",
          revision: "44120be57f1c044de6621d9fe5c25065",
        },
        {
          url: "/icons/beaker-02.svg",
          revision: "e09f5427641229778ac11ba0aebe546e",
        },
        {
          url: "/icons/bell-01.svg",
          revision: "8f0057870af6412821f1a16c40ad6eee",
        },
        {
          url: "/icons/bell-02.svg",
          revision: "6ab1e23db2d454c66e5ff5faa635dd2e",
        },
        {
          url: "/icons/bell-03.svg",
          revision: "3125cad8e6bfc03a1bcb68961c1391bb",
        },
        {
          url: "/icons/bell-04.svg",
          revision: "5f290f4078e587b6fa5803381d150181",
        },
        {
          url: "/icons/bell-minus.svg",
          revision: "ed75155cb4a82701114cab47bd3200d0",
        },
        {
          url: "/icons/bell-off-01.svg",
          revision: "dbcd3f2dd3bc937208f92dadd4236b4f",
        },
        {
          url: "/icons/bell-off-02.svg",
          revision: "9495f87a8b2fc7a5f725ea73fd46bda0",
        },
        {
          url: "/icons/bell-off-03.svg",
          revision: "56d218eb55d6c3a74f7df2582c53f564",
        },
        {
          url: "/icons/bell-plus.svg",
          revision: "60acb4a7b48757f48e25f3f4decebc34",
        },
        {
          url: "/icons/bell-ringing-01.svg",
          revision: "77840ca2ac792c6915b665083f377154",
        },
        {
          url: "/icons/bell-ringing-02.svg",
          revision: "1330a34a2732ba7ea466f291b30760f6",
        },
        {
          url: "/icons/bell-ringing-03.svg",
          revision: "6339c9deb4570281d045fa2a16234730",
        },
        {
          url: "/icons/bell-ringing-04.svg",
          revision: "e592b881fda73256cb075e38a455b469",
        },
        {
          url: "/icons/bezier-curve-01.svg",
          revision: "f6727d4cce15a0c01dccb33109030ec3",
        },
        {
          url: "/icons/bezier-curve-02.svg",
          revision: "d2e21c594e35e791b6deb3114b03a82e",
        },
        {
          url: "/icons/bezier-curve-03.svg",
          revision: "ddf3839ca280bcdbc52d6f2cc3c695a9",
        },
        {
          url: "/icons/bluetooth-connect.svg",
          revision: "2f1d1b8b219d746e0451b4e9b18fcdd6",
        },
        {
          url: "/icons/bluetooth-on.svg",
          revision: "191bb5f7f1cb05db7401616cf21f0ac2",
        },
        {
          url: "/icons/bluetooth-signal.svg",
          revision: "61c0e120d7b13364c5c3f5ba095c9df4",
        },
        {
          url: "/icons/bluetooth.svg",
          revision: "2f5701c710f46d47878e4bef9ec5eebe",
        },
        {
          url: "/icons/bold-01.svg",
          revision: "433f938f0376ed9b24c52dbbc56cadd4",
        },
        {
          url: "/icons/bold-02.svg",
          revision: "95653020a6178fe16cf53944a760e301",
        },
        {
          url: "/icons/bold-square.svg",
          revision: "f0fa56ba54b4ea18f46016dbcdb6058b",
        },
        {
          url: "/icons/book-closed.svg",
          revision: "307219b036b87f34f964cc73fa137650",
        },
        {
          url: "/icons/book-open-01.svg",
          revision: "1de2f824a5ca9663158dd0f50e930397",
        },
        {
          url: "/icons/book-open-02.svg",
          revision: "cc6094a8fce706961a4752a4e8f9dcbe",
        },
        {
          url: "/icons/bookmark-add.svg",
          revision: "d99df4873872f602a614b795ae2d463a",
        },
        {
          url: "/icons/bookmark-check.svg",
          revision: "a802dee1ee97512591dc900ad57cc928",
        },
        {
          url: "/icons/bookmark-minus.svg",
          revision: "5870d0d2efa3601faeb9d10b122089a3",
        },
        {
          url: "/icons/bookmark-x.svg",
          revision: "211ac761f0ec876c47ef458245d28f21",
        },
        {
          url: "/icons/bookmark.svg",
          revision: "ace50c3ca615cd6af82baee0fe223a96",
        },
        { url: "/icons/box.svg", revision: "76b891f483470228d3e2d015c64552e8" },
        {
          url: "/icons/brackets-check.svg",
          revision: "d619d9ca875f84d612207ee582a7b238",
        },
        {
          url: "/icons/brackets-ellipses.svg",
          revision: "b69233e48b6f29b4ad0d1dbce4b90992",
        },
        {
          url: "/icons/brackets-minus.svg",
          revision: "e886be6521f7df3446b1902c2e9f9367",
        },
        {
          url: "/icons/brackets-plus.svg",
          revision: "20c0d3cde66cbb03fbe12671a867dac5",
        },
        {
          url: "/icons/brackets-slash.svg",
          revision: "e712ec5730bf01d3ea1898dc179699f0",
        },
        {
          url: "/icons/brackets-x.svg",
          revision: "10069d703c95778baea63d0f564b19db",
        },
        {
          url: "/icons/brackets.svg",
          revision: "649012c955b2ba1debfb8d512eaefe08",
        },
        {
          url: "/icons/briefcase-01.svg",
          revision: "25130408440fc7b7f116a688315a18a6",
        },
        {
          url: "/icons/briefcase-02.svg",
          revision: "0d4ec0f958c9b7b5d673bd7ecfe1264d",
        },
        {
          url: "/icons/browser.svg",
          revision: "51e2210004874697961bac05ad9de03b",
        },
        {
          url: "/icons/brush-01.svg",
          revision: "2ee12b2d3a22c36758f83f4886ffd6c1",
        },
        {
          url: "/icons/brush-02.svg",
          revision: "ad5b4d6941013ac93ce2e78ac3b42db1",
        },
        {
          url: "/icons/brush-03.svg",
          revision: "a0d925106ac76fb9a455eb70375a68d7",
        },
        {
          url: "/icons/building-01.svg",
          revision: "5cdc38faac828f532c0f01d5232ba9f5",
        },
        {
          url: "/icons/building-02.svg",
          revision: "4143df2e7a7b3db693ef7751c1cacb37",
        },
        {
          url: "/icons/building-03.svg",
          revision: "78cb1dbfd88dbcc028eca3a5cb66fba0",
        },
        {
          url: "/icons/building-04.svg",
          revision: "c6925b66504026551be3d56a8930ceb9",
        },
        {
          url: "/icons/building-05.svg",
          revision: "4358eb859dbcad256f45940c0e293487",
        },
        {
          url: "/icons/building-06.svg",
          revision: "d491a341c07e9a581ecbccf2bebe2cdf",
        },
        {
          url: "/icons/building-07.svg",
          revision: "08d0957b6a89f869885089adc060ca4f",
        },
        {
          url: "/icons/building-08.svg",
          revision: "9bd7ce626d5cd90ec98e32a0061ed415",
        },
        { url: "/icons/bus.svg", revision: "ffd42d588be18d34af8217d3793bd805" },
        {
          url: "/icons/calculator.svg",
          revision: "57f88bc6c051cb9ecc169b4faf679427",
        },
        {
          url: "/icons/calendar-check-01.svg",
          revision: "123612426222d7ab386654145761a03e",
        },
        {
          url: "/icons/calendar-check-02.svg",
          revision: "d075f5a2e503da63438c70442f4c639c",
        },
        {
          url: "/icons/calendar-date.svg",
          revision: "3535c7a853105e9119ef006d89cf9904",
        },
        {
          url: "/icons/calendar-heart-01.svg",
          revision: "f33e02d09250c0939d4769bc068e7881",
        },
        {
          url: "/icons/calendar-heart-02.svg",
          revision: "3f5607186c2d76fa00c65a88ebdd5f07",
        },
        {
          url: "/icons/calendar-minus-01.svg",
          revision: "7abec19ff72fe0dbe5171128fd9f2840",
        },
        {
          url: "/icons/calendar-minus-02.svg",
          revision: "9bb5c26b5fdc9eafaa3e1d39e00290ec",
        },
        {
          url: "/icons/calendar-plus-01.svg",
          revision: "8cdd2024bb4e925351d9205a0faf3b0f",
        },
        {
          url: "/icons/calendar-plus-02.svg",
          revision: "256cd8a847434a0905fcdf2f8f25c638",
        },
        {
          url: "/icons/calendar.svg",
          revision: "67751f1a8e9013d2ec8caba8c62eb0dd",
        },
        {
          url: "/icons/camera-01.svg",
          revision: "fd572ae69be2189d33d3fe1422132422",
        },
        {
          url: "/icons/camera-02.svg",
          revision: "a0c65810b72262205b48bed104573017",
        },
        {
          url: "/icons/camera-03.svg",
          revision: "ae033aaf89e69505953d54dbf0c7fdf4",
        },
        {
          url: "/icons/camera-icon.svg",
          revision: "acd2ae23766ad6988a1d95fb2c2e1c19",
        },
        {
          url: "/icons/camera-lens.svg",
          revision: "aa2489f592d59509cf399f9f85a5def5",
        },
        {
          url: "/icons/camera-off.svg",
          revision: "382b3f6fdc22d44742bea556650527b4",
        },
        {
          url: "/icons/camera-plus.svg",
          revision: "53d915cbefe0edd021124578d00bfc1e",
        },
        {
          url: "/icons/certificate-01.svg",
          revision: "60fd2014b8219d99cb9622bf11024402",
        },
        {
          url: "/icons/certificate-02.svg",
          revision: "c102f3c53d34960ceadb6454035716bf",
        },
        {
          url: "/icons/chart-breakout-circle.svg",
          revision: "cb53544ffd4ef33c9bdb5191f8518bc3",
        },
        {
          url: "/icons/chart-breakout-square.svg",
          revision: "83aaec2a2669688de279c6330d0539a6",
        },
        {
          url: "/icons/check-circle-broken.svg",
          revision: "bf12332d5325e3e2a02406d631ed4576",
        },
        {
          url: "/icons/check-circle.svg",
          revision: "5c9c271f8797d55f904593e54a9de172",
        },
        {
          url: "/icons/check-done-01.svg",
          revision: "47f249c8e398d0f4cd0da60c8a2d4859",
        },
        {
          url: "/icons/check-done-02.svg",
          revision: "44edd1efc0ead94c1f0f5d56842da0ac",
        },
        {
          url: "/icons/check-heart.svg",
          revision: "5d86e10187c62e8ee88929bfffd2e818",
        },
        {
          url: "/icons/check-square-broken.svg",
          revision: "59f45eb2daf1d67b2e2bc69254183800",
        },
        {
          url: "/icons/check-square.svg",
          revision: "cd336dacb8767e1f1b8a5f1238362894",
        },
        {
          url: "/icons/check-verified-01.svg",
          revision: "696fd92b9cc431d16e5f396e6ad42e29",
        },
        {
          url: "/icons/check-verified-02.svg",
          revision: "8bfd28ddaf0303cd2c8448f70dc10316",
        },
        {
          url: "/icons/check-verified-03.svg",
          revision: "038995b6454b478d5692194b0e8f04c5",
        },
        {
          url: "/icons/check.svg",
          revision: "3482bb94c201c95363d5c976cda3eb42",
        },
        {
          url: "/icons/chevron-down-double.svg",
          revision: "6e6287d4b29207922e5a08c04b742ed3",
        },
        {
          url: "/icons/chevron-down.svg",
          revision: "40bc60dfd4e098585fae8bb16a9ee803",
        },
        {
          url: "/icons/chevron-left-double.svg",
          revision: "b06688528f11f1913059b96c9708bbfb",
        },
        {
          url: "/icons/chevron-left.svg",
          revision: "0e0dd6f66ac2800adbf124f17a91e14a",
        },
        {
          url: "/icons/chevron-right-double.svg",
          revision: "205cc55af70c35d827b55886b3c31837",
        },
        {
          url: "/icons/chevron-right.svg",
          revision: "1f4f6acfe8821ad57816f608bd3888fc",
        },
        {
          url: "/icons/chevron-selector-horizontal.svg",
          revision: "00d49482707c7aa1dae348470adfce8a",
        },
        {
          url: "/icons/chevron-selector-vertical.svg",
          revision: "e7963cc32aeb23f2ad65a38f43066666",
        },
        {
          url: "/icons/chevron-up-double.svg",
          revision: "c1e4b8fe9a96ec3bee2a6b8bf5a2f368",
        },
        {
          url: "/icons/chevron-up.svg",
          revision: "cf04a5fe3b234b0cf32fdb5e371f158d",
        },
        {
          url: "/icons/chrome-cast.svg",
          revision: "c064000fb4b25d084dcf10243b3a2430",
        },
        {
          url: "/icons/circle-cut.svg",
          revision: "8e9e262d7c517fa5d216113846a0c8b4",
        },
        {
          url: "/icons/circle.svg",
          revision: "2986580e42bc0e7f8e5168a124dd75a3",
        },
        {
          url: "/icons/clapperboard.svg",
          revision: "4aa1ad1b99d7b7c6be37fb34729c50f5",
        },
        {
          url: "/icons/clipboard-attachment.svg",
          revision: "9237bebad3dc6f4deaab76cc40b5019a",
        },
        {
          url: "/icons/clipboard-check.svg",
          revision: "66cc4b878ec34002731e38a2dc12ef17",
        },
        {
          url: "/icons/clipboard-download.svg",
          revision: "8bb0d933904e4167ec9ec90f19ac7f07",
        },
        {
          url: "/icons/clipboard-minus.svg",
          revision: "b1371496b4d5be9f47c0fc45b5dee205",
        },
        {
          url: "/icons/clipboard-plus.svg",
          revision: "941f509325703b58a37f691d8e4e231e",
        },
        {
          url: "/icons/clipboard-x.svg",
          revision: "f65685dba3d33e98a5223ad1f74bc1fe",
        },
        {
          url: "/icons/clipboard.svg",
          revision: "de420fe3831f5b774064290cd5ec3dc3",
        },
        {
          url: "/icons/clock-check.svg",
          revision: "0a95094bfa5b2af4aa5daf0e439fb87f",
        },
        {
          url: "/icons/clock-fast-forward.svg",
          revision: "6ec07e39d9092fbd05060a76d5d4825d",
        },
        {
          url: "/icons/clock-plus.svg",
          revision: "3e22f7bea9c725a8f1e9632d1fedc0ee",
        },
        {
          url: "/icons/clock-refresh.svg",
          revision: "0bf494bcabafb18e67c8b5b6b0aaebe7",
        },
        {
          url: "/icons/clock-rewind.svg",
          revision: "f46582770072166f3132fb8bd10da2e2",
        },
        {
          url: "/icons/clock-snooze.svg",
          revision: "6fa794affd8ed98d9104120f60f994d1",
        },
        {
          url: "/icons/clock-stopwatch.svg",
          revision: "9a0adb1bee2a4bed67af69f9207984d4",
        },
        {
          url: "/icons/clock.svg",
          revision: "59a9610351af2be4d763e7c3d53f1f66",
        },
        {
          url: "/icons/cloud-01.svg",
          revision: "a616ecdaa97c07470d017632097b39a0",
        },
        {
          url: "/icons/cloud-02.svg",
          revision: "51ae77c3b34a8bf5d917146e3517c7cd",
        },
        {
          url: "/icons/cloud-03.svg",
          revision: "e27e34763c42f4a7a809eee79e0775ee",
        },
        {
          url: "/icons/cloud-blank-01.svg",
          revision: "a616ecdaa97c07470d017632097b39a0",
        },
        {
          url: "/icons/cloud-blank-02.svg",
          revision: "e27e34763c42f4a7a809eee79e0775ee",
        },
        {
          url: "/icons/cloud-lightning.svg",
          revision: "9e8278b58758dfa1c31ee6fffac78c98",
        },
        {
          url: "/icons/cloud-moon.svg",
          revision: "4c807beca37daaba2d0ff3bbe518ea31",
        },
        {
          url: "/icons/cloud-off.svg",
          revision: "0f78a23fdd86737c909867e4a344bfc3",
        },
        {
          url: "/icons/cloud-raining-01.svg",
          revision: "424675aba6d61afc63c170433863b288",
        },
        {
          url: "/icons/cloud-raining-02.svg",
          revision: "7fab9c45ce2296e2a8962270e0ac4445",
        },
        {
          url: "/icons/cloud-raining-03.svg",
          revision: "beffce5c3454e230b81ba008d019995c",
        },
        {
          url: "/icons/cloud-raining-04.svg",
          revision: "ad86dfa59e5a7c6eaf6456aa27cb6018",
        },
        {
          url: "/icons/cloud-raining-05.svg",
          revision: "83912c53890285d0154c150b7588a531",
        },
        {
          url: "/icons/cloud-raining-06.svg",
          revision: "68c2f5f81e56441c57dd58897f9c4075",
        },
        {
          url: "/icons/cloud-snowing-01.svg",
          revision: "2a162f7759d21a0c2fdc120468f154b2",
        },
        {
          url: "/icons/cloud-snowing-02.svg",
          revision: "5f6fb3e292faf778b16b01ec5046e7b3",
        },
        {
          url: "/icons/cloud-sun-01.svg",
          revision: "c4b4a3304274bccece2d08d7859ba0cb",
        },
        {
          url: "/icons/cloud-sun-02.svg",
          revision: "393c9e1b79e6c596cd159b8822c1043d",
        },
        {
          url: "/icons/cloud-sun-03.svg",
          revision: "b145ed24d6e51a79ccbfffac72df84a4",
        },
        {
          url: "/icons/code-01.svg",
          revision: "6694592de4ed531c6ef5bcd30a029b73",
        },
        {
          url: "/icons/code-02.svg",
          revision: "e74656bb0bb3d3b3a1032928386fc820",
        },
        {
          url: "/icons/code-browser.svg",
          revision: "ebb0543dcc9203dcecde3d2a1c1a6792",
        },
        {
          url: "/icons/code-circle-01.svg",
          revision: "2637fee3b8f3551a4c56bad26749b073",
        },
        {
          url: "/icons/code-circle-02.svg",
          revision: "e3764ff8ebaa3fc784f4e07588cd927b",
        },
        {
          url: "/icons/code-circle-03.svg",
          revision: "5382c0db4a4e143ed166c1b59f02dd4e",
        },
        {
          url: "/icons/code-snippet-01.svg",
          revision: "6694592de4ed531c6ef5bcd30a029b73",
        },
        {
          url: "/icons/code-snippet-02.svg",
          revision: "e74656bb0bb3d3b3a1032928386fc820",
        },
        {
          url: "/icons/code-square-01.svg",
          revision: "3def7d1156a7e6f535459f92a3d22eed",
        },
        {
          url: "/icons/code-square-02.svg",
          revision: "344c91f517369400a79ef1b22dcf4e9e",
        },
        {
          url: "/icons/codepen.svg",
          revision: "dd4887c2e093e84d84967fa190d53f08",
        },
        {
          url: "/icons/coins-01.svg",
          revision: "c8a84a2258d1c91f5b290bee668374a5",
        },
        {
          url: "/icons/coins-02.svg",
          revision: "3ce7cc62598171b61c611372c66bda08",
        },
        {
          url: "/icons/coins-03.svg",
          revision: "e3fb5c0cfa199e8d2b6e936727f3c3f1",
        },
        {
          url: "/icons/coins-04.svg",
          revision: "1c8af43de482f712a99eb016b5db707c",
        },
        {
          url: "/icons/coins-hand.svg",
          revision: "999fe3640a9c5c072fe9a0745a5d2489",
        },
        {
          url: "/icons/coins-stacked-01.svg",
          revision: "fc961577c0346ba5cc711664d4818318",
        },
        {
          url: "/icons/coins-stacked-02.svg",
          revision: "764c40ad0801618dffd7dab8fed64b35",
        },
        {
          url: "/icons/coins-stacked-03.svg",
          revision: "68661bf417d05a5d9596ac937c47357e",
        },
        {
          url: "/icons/coins-stacked-04.svg",
          revision: "b3522796eb02c0a96bd49f7dc2a6c953",
        },
        {
          url: "/icons/coins-swap-01.svg",
          revision: "303eee2c060becfb56c34ba699734b4c",
        },
        {
          url: "/icons/coins-swap-02.svg",
          revision: "cfd2fc5fbfbab1c001e733a8d9a8c6d2",
        },
        {
          url: "/icons/colors-1.svg",
          revision: "7688f8a4592860504069e298cc84b055",
        },
        {
          url: "/icons/colors.svg",
          revision: "7688f8a4592860504069e298cc84b055",
        },
        {
          url: "/icons/columns-02.svg",
          revision: "7d4174cf9e8d507c33b9232df894a127",
        },
        {
          url: "/icons/columns-03.svg",
          revision: "16f2f5173707e34842de1d5f4c7b5973",
        },
        {
          url: "/icons/command.svg",
          revision: "74ca29698cedcb42af5ba50263276586",
        },
        {
          url: "/icons/compass-01.svg",
          revision: "8f1b0c57fccb023687c321c1f6b8d288",
        },
        {
          url: "/icons/compass-02.svg",
          revision: "b8e4054efc758d04b2a7ce661a2a5b45",
        },
        {
          url: "/icons/compass-03.svg",
          revision: "5046a6e34e5344b473524a417d466e58",
        },
        {
          url: "/icons/compass.svg",
          revision: "c4e6f5b828bd1db8a099b0074ed6e7f7",
        },
        {
          url: "/icons/container.svg",
          revision: "64f492ea9228a60dcfe51153728693ae",
        },
        {
          url: "/icons/contrast-01.svg",
          revision: "71c540a3962e3cf36231978d31b4d774",
        },
        {
          url: "/icons/contrast-02.svg",
          revision: "202ec5176fe040d3bdd47b543b014344",
        },
        {
          url: "/icons/contrast-03.svg",
          revision: "948b7eadb94c4c283cb1965a70da64ea",
        },
        {
          url: "/icons/copy-01.svg",
          revision: "7d8f6c8c0e2984bd6649c59e19085b44",
        },
        {
          url: "/icons/copy-02.svg",
          revision: "42420b791a2908c3caa5876fee6730af",
        },
        {
          url: "/icons/copy-03.svg",
          revision: "2a689a4beb71812f1541dd99fe954cb5",
        },
        {
          url: "/icons/copy-04.svg",
          revision: "fc8ff504a423f968f87829e8d2bf23a2",
        },
        {
          url: "/icons/copy-05.svg",
          revision: "ec60b246462a7c99895bc1f6c291d6e0",
        },
        {
          url: "/icons/copy-06.svg",
          revision: "f80ec879ef76121476d46880240cf36b",
        },
        {
          url: "/icons/copy-07.svg",
          revision: "d3071a5b25b81ecb0fdfe3ad4096caa4",
        },
        {
          url: "/icons/corner-down-left.svg",
          revision: "07098a830d9d3d2c5dd3b97df8dc36f8",
        },
        {
          url: "/icons/corner-down-right.svg",
          revision: "528a23ed5381f4ac28a2a4287f997575",
        },
        {
          url: "/icons/corner-left-down.svg",
          revision: "854b7b5b8e8ae3ea8ff8a740652bcfcd",
        },
        {
          url: "/icons/corner-left-up.svg",
          revision: "75f1806533f129d643d75757aada6a5a",
        },
        {
          url: "/icons/corner-right-down.svg",
          revision: "b8dbf59900584b6723ceb73074724f36",
        },
        {
          url: "/icons/corner-right-up.svg",
          revision: "cee0aff13d3f83f73a9447e9987d7e10",
        },
        {
          url: "/icons/corner-up-left.svg",
          revision: "874ee496f04e527963f1b17bcd7bfd8c",
        },
        {
          url: "/icons/corner-up-right.svg",
          revision: "e9bc0a0a32aeb8f7eaee453c92f993b8",
        },
        {
          url: "/icons/cpu-chip-01.svg",
          revision: "054219e37922646f72672efb050600e4",
        },
        {
          url: "/icons/cpu-chip-02.svg",
          revision: "6e31333277d11e2744d846276e516330",
        },
        {
          url: "/icons/credit-card-01.svg",
          revision: "abeefa93ae39677f9138c19cb57c4b2d",
        },
        {
          url: "/icons/credit-card-02.svg",
          revision: "e75c1c6999af16163cd9b4ac6ce80dce",
        },
        {
          url: "/icons/credit-card-check.svg",
          revision: "ec2cee6c1abee498bfd2217002b8536b",
        },
        {
          url: "/icons/credit-card-down.svg",
          revision: "7a60500e5549c0a2aacdd6810bf182df",
        },
        {
          url: "/icons/credit-card-download.svg",
          revision: "9494d9c7472e8453f8935b37922c1ae7",
        },
        {
          url: "/icons/credit-card-edit.svg",
          revision: "1d5cec96beb0b120fe3fd3a230f2b7df",
        },
        {
          url: "/icons/credit-card-lock.svg",
          revision: "3e36e9c278bc7ebe1a94b04d8958b1b2",
        },
        {
          url: "/icons/credit-card-minus.svg",
          revision: "73c4e8684ebb7ca218752ff619def21e",
        },
        {
          url: "/icons/credit-card-plus.svg",
          revision: "4e12e8ed1976b34a6085156edbdd1cb9",
        },
        {
          url: "/icons/credit-card-refresh.svg",
          revision: "19a50fc6115dedd394afb5a4dcd3f670",
        },
        {
          url: "/icons/credit-card-search.svg",
          revision: "dc74784d3113a1720d3d9284fe5ff248",
        },
        {
          url: "/icons/credit-card-shield.svg",
          revision: "ce3bc2708f2d6f7cfa6ccb356b04de98",
        },
        {
          url: "/icons/credit-card-up.svg",
          revision: "1e16f618487b14fe098141698e51f1c1",
        },
        {
          url: "/icons/credit-card-upload.svg",
          revision: "b03eb39bd138c8c68acef39ab59c030d",
        },
        {
          url: "/icons/credit-card-x.svg",
          revision: "1ebca04eed7e8a26c9f1ff3925ea87f3",
        },
        {
          url: "/icons/crop-01.svg",
          revision: "d2f752e13d662e0454e8496755e78892",
        },
        {
          url: "/icons/crop-02.svg",
          revision: "dd07dfc4b56f0f87724fe422bc353545",
        },
        {
          url: "/icons/cryptocurrency-01.svg",
          revision: "154bd0d72ad99c2d04d6d9331f463983",
        },
        {
          url: "/icons/cryptocurrency-02.svg",
          revision: "6b8825ffb663f0ee2ef4923df9112805",
        },
        {
          url: "/icons/cryptocurrency-03.svg",
          revision: "d75c3e73145daf87d7a4335f69fde626",
        },
        {
          url: "/icons/cryptocurrency-04.svg",
          revision: "8a87d0327b62dbfb952e64fe58fc12c4",
        },
        {
          url: "/icons/cube-01.svg",
          revision: "64f492ea9228a60dcfe51153728693ae",
        },
        {
          url: "/icons/cube-02.svg",
          revision: "6d916ca7d0c73496ac7feeae64a57216",
        },
        {
          url: "/icons/cube-03.svg",
          revision: "face9c504a3ea65e30a562eca69ac9b4",
        },
        {
          url: "/icons/cube-04.svg",
          revision: "b878ac4c835aee14c45d21cff8e50b4b",
        },
        {
          url: "/icons/cube-outline.svg",
          revision: "929d274400706799b7ef3c22f96148e9",
        },
        {
          url: "/icons/currency-bitcoin-circle.svg",
          revision: "5eb5a53be6192a134a3778d701309214",
        },
        {
          url: "/icons/currency-bitcoin.svg",
          revision: "9c91c7dcdca81dd5719cc3ce5172e8a8",
        },
        {
          url: "/icons/currency-dollar-circle.svg",
          revision: "fb38b4dfbbab9bec2c7039d834ffc6aa",
        },
        {
          url: "/icons/currency-dollar.svg",
          revision: "6ab3746e60f1a14a0e04a516a6106ef3",
        },
        {
          url: "/icons/currency-ethereum-circle.svg",
          revision: "bba59237f90054cd830d7a96418608f5",
        },
        {
          url: "/icons/currency-ethereum.svg",
          revision: "afe046a85887d9fad0fdc49910302fca",
        },
        {
          url: "/icons/currency-euro-circle.svg",
          revision: "8485bd68f2cf9f85d476c05d0ac6333e",
        },
        {
          url: "/icons/currency-euro.svg",
          revision: "7b46d0df8539bb111172a1e7c2981c91",
        },
        {
          url: "/icons/currency-pound-circle.svg",
          revision: "a6d25e78eb4f51e92a42d65b2473bbe3",
        },
        {
          url: "/icons/currency-pound.svg",
          revision: "1fa7e52a25074320350534d26bc7821f",
        },
        {
          url: "/icons/currency-ruble-circle.svg",
          revision: "5fd71f4a264614eb0d556c10f719e741",
        },
        {
          url: "/icons/currency-ruble.svg",
          revision: "3f63ab5793cb957eecd99fa7964765e5",
        },
        {
          url: "/icons/currency-rupee-circle.svg",
          revision: "2ce7c8cdcf647b6638ffcbf6847f4cf0",
        },
        {
          url: "/icons/currency-rupee.svg",
          revision: "2d7a270af251633ab5561a968223160d",
        },
        {
          url: "/icons/currency-yen-circle.svg",
          revision: "ebd50353a9c08778349cb71d9fdecec3",
        },
        {
          url: "/icons/currency-yen.svg",
          revision: "88a27325cafbbf0937dcab84042a89d9",
        },
        {
          url: "/icons/cursor-01.svg",
          revision: "cd81c79c1db0ad7f1665e1f83726826a",
        },
        {
          url: "/icons/cursor-02.svg",
          revision: "f06b43de963d457e2136f170b7ddd481",
        },
        {
          url: "/icons/cursor-03.svg",
          revision: "df3e58ffebd4cd6e0d99bf6d9122f5f5",
        },
        {
          url: "/icons/cursor-04.svg",
          revision: "06a991dbba949b3266dc7fa81e09787c",
        },
        {
          url: "/icons/cursor-box.svg",
          revision: "43aaec77f20868100acf278236862d4b",
        },
        {
          url: "/icons/cursor-click-01.svg",
          revision: "eaee797849d261a61d0a04f51402997e",
        },
        {
          url: "/icons/cursor-click-02.svg",
          revision: "0c7b7a83cb6b9a868f7819ebf4d3f721",
        },
        {
          url: "/icons/data.svg",
          revision: "17153c936f5d921ed4ac486089566bae",
        },
        {
          url: "/icons/database-01.svg",
          revision: "95c6ad79ecd91f6115a1ac447ba6dae1",
        },
        {
          url: "/icons/database-02.svg",
          revision: "2eb95987cc999375aaad11a2ef7106e0",
        },
        {
          url: "/icons/database-03.svg",
          revision: "5d6cea350b0d169b06c6318b3f51ca40",
        },
        {
          url: "/icons/dataflow-01.svg",
          revision: "e7361433ed64cb96e3ea2012c65ce2dd",
        },
        {
          url: "/icons/dataflow-02.svg",
          revision: "31d3ec02c817cc8f10e6b3b7e63e02be",
        },
        {
          url: "/icons/dataflow-03.svg",
          revision: "e67b1aebf7f930563e8fe51daf509a97",
        },
        {
          url: "/icons/dataflow-04.svg",
          revision: "d4e89d4af0712d3f963213efce854fc6",
        },
        {
          url: "/icons/delete.svg",
          revision: "0c0aabb8b77b111451d81032c46b0ac9",
        },
        {
          url: "/icons/diamond-01.svg",
          revision: "2a280812e712657a75da7397a65631f0",
        },
        {
          url: "/icons/diamond-02.svg",
          revision: "a50645b5ead33376e23066c85e3a58f2",
        },
        {
          url: "/icons/dice-1.svg",
          revision: "0594cf3827db9f0a2ce220fdb1330272",
        },
        {
          url: "/icons/dice-2.svg",
          revision: "ba6e1c102703778ca13367682a3f85fa",
        },
        {
          url: "/icons/dice-3.svg",
          revision: "8e1eb72f1b947fa30c1c9372dd5a7489",
        },
        {
          url: "/icons/dice-4.svg",
          revision: "0121ce294196e7a04bf4865fef066aa4",
        },
        {
          url: "/icons/dice-5.svg",
          revision: "b50cfebebd2f769c623d262a699c2608",
        },
        {
          url: "/icons/dice-6.svg",
          revision: "9fa250a852ece7268bbad1d774ce08b9",
        },
        {
          url: "/icons/disc-01.svg",
          revision: "f745f29b7559d7870ec42523500112ce",
        },
        {
          url: "/icons/disc-02.svg",
          revision: "5ef173fabf7f1c2d928632a54749345b",
        },
        {
          url: "/icons/distribute-spacing-horizontal.svg",
          revision: "27a222c1e2efac05ff09346286fa7018",
        },
        {
          url: "/icons/distribute-spacing-vertical.svg",
          revision: "087ff3f73d2c16ccf45ced35e4b43ace",
        },
        {
          url: "/icons/divide-01.svg",
          revision: "00ff4bc7619f0852641461663e2b2f98",
        },
        {
          url: "/icons/divide-02.svg",
          revision: "625c41aa706009b9d99d7d199be10c86",
        },
        {
          url: "/icons/divide-03.svg",
          revision: "3f2cd879afce77cdb4c4a65d60506436",
        },
        {
          url: "/icons/divider.svg",
          revision: "7aca6c4dec9c2fd70e1723275b7d78f9",
        },
        {
          url: "/icons/docs-icon.svg",
          revision: "1887ad4046798f25baa7a76d05737642",
        },
        {
          url: "/icons/docs-icon2x.svg",
          revision: "a716f38730c595e267a99f00feb0ae8d",
        },
        {
          url: "/icons/dotpoints-01.svg",
          revision: "608e644fc4f3ca5da2d5d873f6b40bfe",
        },
        {
          url: "/icons/dotpoints-02.svg",
          revision: "55334bbba36812c759046677f7ed8315",
        },
        {
          url: "/icons/dots-grid.svg",
          revision: "23cd36c8920d073b8ff3566441473800",
        },
        {
          url: "/icons/dots-horizontal.svg",
          revision: "a7304d0afb266e414bde08fa7203d8b1",
        },
        {
          url: "/icons/dots-vertical.svg",
          revision: "447040c1443afd45d29868c48c3d3257",
        },
        {
          url: "/icons/download-01.svg",
          revision: "9f94081a4e14be22f80ab9faa90acf12",
        },
        {
          url: "/icons/download-02.svg",
          revision: "dab9eab91f222e5da76d9798aee56d67",
        },
        {
          url: "/icons/download-03.svg",
          revision: "cbe82f75bd247f2f18fc7feb609711b4",
        },
        {
          url: "/icons/download-04.svg",
          revision: "716e6324692a14a36bbc7bf17951205e",
        },
        {
          url: "/icons/download-cloud-01.svg",
          revision: "4186c7e317c0e1def61ae117b2cfd857",
        },
        {
          url: "/icons/download-cloud-02.svg",
          revision: "1dd97d666000d7a3021180cad31f0741",
        },
        {
          url: "/icons/drop.svg",
          revision: "f56cc4fb1a1a86731b10e5d8e7563f1e",
        },
        {
          url: "/icons/droplets-01.svg",
          revision: "a8e19d4fd386d5ff6c03ce0f67650f40",
        },
        {
          url: "/icons/droplets-02.svg",
          revision: "d1e7ee122a58f55ca9fbee9ca94fb5bc",
        },
        {
          url: "/icons/droplets-03.svg",
          revision: "8bb821865fb5cf75f1d089c3d8107cd8",
        },
        {
          url: "/icons/dropper.svg",
          revision: "c775228f9d79335b2e81c65f2bdffa32",
        },
        {
          url: "/icons/edit-01.svg",
          revision: "e7772dd114a25828928a8ad76f48f78a",
        },
        {
          url: "/icons/edit-02.svg",
          revision: "045476b41a9614a0344ddf8a42413465",
        },
        {
          url: "/icons/edit-03.svg",
          revision: "8e64548cdd779bbcf22600041c03ed28",
        },
        {
          url: "/icons/edit-04.svg",
          revision: "c0659754abb827d64f6f8a6db004ced4",
        },
        {
          url: "/icons/edit-05.svg",
          revision: "6d8e6fb8751b1612dfecdfdd6dd72764",
        },
        {
          url: "/icons/equal-not.svg",
          revision: "4be578aa371b432fdca2fc2d252d57be",
        },
        {
          url: "/icons/equal.svg",
          revision: "33b8fd783b26029f42ec2b11c945bcf0",
        },
        {
          url: "/icons/eraser.svg",
          revision: "d58ae2c617a81d0eefbdb52a243c593c",
        },
        {
          url: "/icons/expand-01.svg",
          revision: "bc5b9fd8067a3c65ba9aa32c2897baf7",
        },
        {
          url: "/icons/expand-02.svg",
          revision: "eb925c94335db72df4433255afae985f",
        },
        {
          url: "/icons/expand-03.svg",
          revision: "79a28d8469163ebc417954d586b46ae8",
        },
        {
          url: "/icons/expand-04.svg",
          revision: "a1ca1ea680197b320d699124dfb949db",
        },
        {
          url: "/icons/expand-05.svg",
          revision: "82027343c92985d3885983860f5d66a4",
        },
        {
          url: "/icons/expand-06.svg",
          revision: "ea3ea1246337eaa5e702f9fbccc49b03",
        },
        {
          url: "/icons/eye-off.svg",
          revision: "f98cec3fab7caa1ecb103f4d6b486a69",
        },
        { url: "/icons/eye.svg", revision: "51ab0261a2eaabd56991b9d1350f755d" },
        {
          url: "/icons/face-content.svg",
          revision: "70d3d343d92da4b1be637bd5d1d4804b",
        },
        {
          url: "/icons/face-frown.svg",
          revision: "fc0042dd04ab1b835fc7ccc6f1484d7e",
        },
        {
          url: "/icons/face-happy.svg",
          revision: "79226ae114c6f3b42f7fc48b8c26a426",
        },
        {
          url: "/icons/face-id-square.svg",
          revision: "043164144e92543c15a6dd2e431c55e6",
        },
        {
          url: "/icons/face-id.svg",
          revision: "adaae89801cc982828cb6e98ac59d49f",
        },
        {
          url: "/icons/face-neutral.svg",
          revision: "843a3153e13fac50c148a3df333737e6",
        },
        {
          url: "/icons/face-sad.svg",
          revision: "70c8ed6c08bcb23c85b532b0c9b462a8",
        },
        {
          url: "/icons/face-smile.svg",
          revision: "799f6358e4c8b02a72282f4677a2015d",
        },
        {
          url: "/icons/face-wink.svg",
          revision: "7e6dad0f14f95dab1bf1d6c2d03f518e",
        },
        {
          url: "/icons/fast-backward.svg",
          revision: "154df54a0e4d2e880fccaa944f99b550",
        },
        {
          url: "/icons/fast-forward.svg",
          revision: "37369ee8e1b8acbcd6d8f6a1c47bf9ae",
        },
        {
          url: "/icons/feather.svg",
          revision: "89812ba50371b968ad2cba569271adcb",
        },
        {
          url: "/icons/figma.svg",
          revision: "b405489e2fd3b66c378a9dc49ae30066",
        },
        {
          url: "/icons/file-01.svg",
          revision: "acad7e51cf9ff5b975dfb013f74965fa",
        },
        {
          url: "/icons/file-02.svg",
          revision: "5dbfce626e1145d7aa14d5fb6a7e8c76",
        },
        {
          url: "/icons/file-03.svg",
          revision: "f176c2c45f578cd0db99a8ed128620a4",
        },
        {
          url: "/icons/file-04.svg",
          revision: "8d718e1ccf8096873eee539f965f3cd8",
        },
        {
          url: "/icons/file-05.svg",
          revision: "cb2ac4029c9bab31b594d56a1918af68",
        },
        {
          url: "/icons/file-06.svg",
          revision: "abbbbe3ef9e4463f6eb78e5946fbdfb8",
        },
        {
          url: "/icons/file-07.svg",
          revision: "d5302f10e5b4a6f8ecc2f20e162235b1",
        },
        {
          url: "/icons/file-attachment-01.svg",
          revision: "e5f5f0e78f1a5d924a4e7a28717a5fe6",
        },
        {
          url: "/icons/file-attachment-02.svg",
          revision: "cff7fa3d08af0385110576aec5f2244a",
        },
        {
          url: "/icons/file-attachment-03.svg",
          revision: "9557e8be92e4c8f1e114dd109a7096f6",
        },
        {
          url: "/icons/file-attachment-04.svg",
          revision: "1aab140f17cbc55c2f8ec0a90eb32756",
        },
        {
          url: "/icons/file-attachment-05.svg",
          revision: "a09f6090a02d4f4dc59728c50080b689",
        },
        {
          url: "/icons/file-check-01.svg",
          revision: "c5be7a44482cbab4d854928cec8797f4",
        },
        {
          url: "/icons/file-check-02.svg",
          revision: "cff38425712273528a186e13ecd718b7",
        },
        {
          url: "/icons/file-check-03.svg",
          revision: "42e8128c5762acb48d510d22fd41e796",
        },
        {
          url: "/icons/file-code-01.svg",
          revision: "beef2d54b9f66a7c1c0b2868b9bab2ed",
        },
        {
          url: "/icons/file-code-02.svg",
          revision: "db0b5605daa3a802c1a219f097b75a14",
        },
        {
          url: "/icons/file-download-01.svg",
          revision: "01553b79f2bd16df77cffbb384eca77f",
        },
        {
          url: "/icons/file-download-02-1.svg",
          revision: "197dd3e768e9f56eec0520d77673cb95",
        },
        {
          url: "/icons/file-download-02.svg",
          revision: "197dd3e768e9f56eec0520d77673cb95",
        },
        {
          url: "/icons/file-download-03.svg",
          revision: "38c7bdcf09b74f5937bb2e38301e6efe",
        },
        {
          url: "/icons/file-heart-01.svg",
          revision: "4ee9637770174ff138ad6c144a1a6823",
        },
        {
          url: "/icons/file-heart-02.svg",
          revision: "76524e370f6aa625a765c10fe9410756",
        },
        {
          url: "/icons/file-heart-03.svg",
          revision: "473e7ad0137ebeb08c33f1791209caee",
        },
        {
          url: "/icons/file-lock-01.svg",
          revision: "4e1f51b647b77ec056bdb4c22cd5092a",
        },
        {
          url: "/icons/file-lock-02.svg",
          revision: "f0a0ba151380cd32d31d5a1588fe870f",
        },
        {
          url: "/icons/file-lock-03.svg",
          revision: "8de2bad7aff041eb1178da09cf0e5c20",
        },
        {
          url: "/icons/file-minus-01.svg",
          revision: "0b8727cf8770fe3604171e359f131aad",
        },
        {
          url: "/icons/file-minus-02.svg",
          revision: "47cc92bc271133b293fea3e6b1c692d2",
        },
        {
          url: "/icons/file-minus-03.svg",
          revision: "73c060f30f37562df1419c7715f94ff4",
        },
        {
          url: "/icons/file-plus-01.svg",
          revision: "843338dd46af6a4dd7e73386c8a9e3a7",
        },
        {
          url: "/icons/file-plus-02.svg",
          revision: "8a84d369fb6121f4b65035d2d12be0c3",
        },
        {
          url: "/icons/file-plus-03.svg",
          revision: "b90fa717d2ed21146e2a9150654eaacf",
        },
        {
          url: "/icons/file-question-01.svg",
          revision: "0ae21253729f1b0723ebe4423e0e89ae",
        },
        {
          url: "/icons/file-question-02.svg",
          revision: "6b5b606151a5e716f59f3d5570211391",
        },
        {
          url: "/icons/file-question-03.svg",
          revision: "572c82b95f765b091ab4e737b97a1ffd",
        },
        {
          url: "/icons/file-search-01.svg",
          revision: "8773e6e165a73db8169db63b25ebbb50",
        },
        {
          url: "/icons/file-search-02.svg",
          revision: "aa2a0fe9cc680687192005d5175c0756",
        },
        {
          url: "/icons/file-search-03.svg",
          revision: "98fc82a89dd02d94b80c84f6608ad6a8",
        },
        {
          url: "/icons/file-shield-01.svg",
          revision: "7f88e44fd2f32027469981ef6e4082a1",
        },
        {
          url: "/icons/file-shield-02.svg",
          revision: "631710ceb2877a70fb3999d277e0036a",
        },
        {
          url: "/icons/file-shield-03.svg",
          revision: "b91458f8b096cc8bba4db94af559ed5f",
        },
        {
          url: "/icons/file-x-01.svg",
          revision: "491fc6841b833fa67eba21663a736676",
        },
        {
          url: "/icons/file-x-02.svg",
          revision: "daa6ca80c1a0cc72cf2832bdb0ae6f69",
        },
        {
          url: "/icons/file-x-03.svg",
          revision: "93183a48ad984d27c36b4907e962ec0a",
        },
        {
          url: "/icons/film-01.svg",
          revision: "309ee6a26bc7b93e4844823e36a4d8b6",
        },
        {
          url: "/icons/film-02.svg",
          revision: "27fa41a942b4e01af9287a54498b21f5",
        },
        {
          url: "/icons/film-03.svg",
          revision: "2591e5561ab77ffe4bbe1b0bfc114eea",
        },
        {
          url: "/icons/filter-funnel-01.svg",
          revision: "eec1002ff7f92c7a5545c564f92683e7",
        },
        {
          url: "/icons/filter-funnel-02.svg",
          revision: "3896dfe4570b874a5cc90e9eaa070ef7",
        },
        {
          url: "/icons/filter-lines.svg",
          revision: "4c01fdc95df9224f08d9388c6871fc4a",
        },
        {
          url: "/icons/fingerprint-01.svg",
          revision: "46c253416accf4431336bfe0cb4042a5",
        },
        {
          url: "/icons/fingerprint-02.svg",
          revision: "8946892e3c754f9f4ec89769e652e936",
        },
        {
          url: "/icons/fingerprint-03.svg",
          revision: "57f21d8f2b213d3c370b7bab8c33a6d1",
        },
        {
          url: "/icons/fingerprint-04.svg",
          revision: "9e56524eb65edf5856d5566f63e4ad10",
        },
        {
          url: "/icons/flag-01.svg",
          revision: "2a13f40e55b1d6f18c2501d9b2f91770",
        },
        {
          url: "/icons/flag-02.svg",
          revision: "47737aa42d3ee1caf0a9644e7dd8b740",
        },
        {
          url: "/icons/flag-03.svg",
          revision: "9f4df91c6eb9802bf9380dddc1760062",
        },
        {
          url: "/icons/flag-04.svg",
          revision: "c31ad35dbed9b5642a28c1282d97dea0",
        },
        {
          url: "/icons/flag-05.svg",
          revision: "e5f48f34614cc23ac1a4096e75a3d677",
        },
        {
          url: "/icons/flag-06.svg",
          revision: "527cc479832f26bb3e24d68484ddae52",
        },
        {
          url: "/icons/flash-off.svg",
          revision: "c6fc58e88e3b3d1b6e03ad01145b2f05",
        },
        {
          url: "/icons/flash.svg",
          revision: "e1ea657a777c26534df375955dc7a972",
        },
        {
          url: "/icons/flex-align-bottom.svg",
          revision: "87f19f0ac2fbdd6ab686fd0f288c8b74",
        },
        {
          url: "/icons/flex-align-left.svg",
          revision: "1faccec2254fe60992fcc10589e6bf07",
        },
        {
          url: "/icons/flex-align-right.svg",
          revision: "1583ff62e368da9c27a4f5c0fa5bf63b",
        },
        {
          url: "/icons/flex-align-top.svg",
          revision: "cd04024bb6e06feffd5c7d8780d3ddbd",
        },
        {
          url: "/icons/flip-backward.svg",
          revision: "789354d7978c44f71be2f610607c580c",
        },
        {
          url: "/icons/flip-forward.svg",
          revision: "e226eee6f4677036cfba516b7fb12ab1",
        },
        {
          url: "/icons/folder-check.svg",
          revision: "9bfe96eb591f315d281c6bddace4ee96",
        },
        {
          url: "/icons/folder-closed.svg",
          revision: "d85b458fa09d44d11eb8164dd6a96d12",
        },
        {
          url: "/icons/folder-code.svg",
          revision: "a602438849e19f4920678ff25de5efb7",
        },
        {
          url: "/icons/folder-download.svg",
          revision: "106cb9d97d2bf1095f1abde6d2f0707a",
        },
        {
          url: "/icons/folder-icon.svg",
          revision: "215257e99c2831597818f022d9fddee0",
        },
        {
          url: "/icons/folder-lock.svg",
          revision: "00394087c784dfa8365a7426ad78e431",
        },
        {
          url: "/icons/folder-minus.svg",
          revision: "510cda6a02ee58b1cc32200e8581155d",
        },
        {
          url: "/icons/folder-plus.svg",
          revision: "004bb630cb1948b80b6db0e343ee1d36",
        },
        {
          url: "/icons/folder-question.svg",
          revision: "f9be80074da8181918c78654a7f94b09",
        },
        {
          url: "/icons/folder-search.svg",
          revision: "f68aeac9f48b3833777530e783f8ae85",
        },
        {
          url: "/icons/folder-shield.svg",
          revision: "c91493b69d0f1fb2bdc3c9ac600cfb49",
        },
        {
          url: "/icons/folder-x.svg",
          revision: "0aa6c2eec9c1ac640a639877f4a7e28d",
        },
        {
          url: "/icons/folder.svg",
          revision: "90136ae9a52cdd49ec80f8a79ce25181",
        },
        {
          url: "/icons/framer.svg",
          revision: "77d4fd10eba19869c5c65b7c413d414a",
        },
        {
          url: "/icons/gaming-pad-01.svg",
          revision: "0fe98bea2b3d97a01d22128332e24332",
        },
        {
          url: "/icons/gaming-pad-02.svg",
          revision: "81e758a3a83a36a2602492d41ba3851b",
        },
        {
          url: "/icons/gift-01.svg",
          revision: "ad5e58f65bd648962af8ad941146f41d",
        },
        {
          url: "/icons/gift-02.svg",
          revision: "51db52eacb88bf28712e1581f0845561",
        },
        {
          url: "/icons/git-branch-01.svg",
          revision: "77e224a5edaa72088dcf054a149d1d95",
        },
        {
          url: "/icons/git-branch-02.svg",
          revision: "aca36cd8ac5f6b0b083f037b7f943a8e",
        },
        {
          url: "/icons/git-commit.svg",
          revision: "b751cc1a53251368f2e56bb7326e8a46",
        },
        {
          url: "/icons/git-merge.svg",
          revision: "46d6cc686efcc68dab8653f720fa4b51",
        },
        {
          url: "/icons/git-pull-request.svg",
          revision: "7fbb990d7fa6dde4181ce4b6d20073a8",
        },
        {
          url: "/icons/glasses-01.svg",
          revision: "c9e1165414d63948f159e359e8692d72",
        },
        {
          url: "/icons/glasses-02.svg",
          revision: "ee55c6300e9563eed4c2ee13077ae634",
        },
        {
          url: "/icons/globe-01-1.svg",
          revision: "abfd9e1f29912cffe663e90c0e7af522",
        },
        {
          url: "/icons/globe-01.svg",
          revision: "ae8708de7ed7cd4cf5826bf625d55f25",
        },
        {
          url: "/icons/globe-02-1.svg",
          revision: "548500d0acabf6965c2f35ff86f01f8b",
        },
        {
          url: "/icons/globe-02.svg",
          revision: "b2ef04f15f23f88df2b07d2b8fed7d6f",
        },
        {
          url: "/icons/globe-03.svg",
          revision: "86dc0fd118213956b25fad7e39da95fc",
        },
        {
          url: "/icons/globe-04.svg",
          revision: "bff2885c3ef731564255d37d95872b0d",
        },
        {
          url: "/icons/globe-05.svg",
          revision: "81cbee50c782769f98805acd78a4fb37",
        },
        {
          url: "/icons/globe-06.svg",
          revision: "cdb51c3f6664937e01b46abc906512ab",
        },
        {
          url: "/icons/google-chrome.svg",
          revision: "d5a3ee87ebde8e7472668751b8cde50f",
        },
        {
          url: "/icons/graduation-hat-01.svg",
          revision: "18aa7cd82b511f302e6473ccd00886ed",
        },
        {
          url: "/icons/graduation-hat-02.svg",
          revision: "e3dd59242984990f33ee0d2af1d6d773",
        },
        {
          url: "/icons/grid-01.svg",
          revision: "08f740c4a4f7529a250ac25b5e67d655",
        },
        {
          url: "/icons/grid-02.svg",
          revision: "d26108b0a4dab94798a458e3ae3a62c1",
        },
        {
          url: "/icons/grid-03.svg",
          revision: "2a5c043835a18b8714f0ef01aa960f95",
        },
        {
          url: "/icons/grid-dots-blank.svg",
          revision: "4014b7fe5cfe3f8181d1276e6815490a",
        },
        {
          url: "/icons/grid-dots-bottom.svg",
          revision: "c53ea71ce17361821933ed9020ba34e7",
        },
        {
          url: "/icons/grid-dots-horizontal-center.svg",
          revision: "aaeaf068f6e5e1fa8625da9a3c04003b",
        },
        {
          url: "/icons/grid-dots-left.svg",
          revision: "faa1816bc54807437784693dd6651a5e",
        },
        {
          url: "/icons/grid-dots-outer.svg",
          revision: "6d666e70779a917849457dd8f98bcc38",
        },
        {
          url: "/icons/grid-dots-right.svg",
          revision: "3e64da6457a15d6a939a267b4d6f98d8",
        },
        {
          url: "/icons/grid-dots-top.svg",
          revision: "6b18ae4d18d786c69ecf419f4cd329cd",
        },
        {
          url: "/icons/grid-dots-vertical-center.svg",
          revision: "e0fe3a7b43512b7bf3d1c5c3617dc38a",
        },
        {
          url: "/icons/grid.svg",
          revision: "bb1ec09619b385059a4fd108dad02c7b",
        },
        {
          url: "/icons/hand.svg",
          revision: "9dfaeb3079d5d02064abc96c3be48b29",
        },
        {
          url: "/icons/hard-drive.svg",
          revision: "f6b58476aedaafe9cef1cdceeb601846",
        },
        {
          url: "/icons/hash-01.svg",
          revision: "ee5a1f7df50e18821dcd8578aed6cc68",
        },
        {
          url: "/icons/hash-02.svg",
          revision: "14c9a7ea59f9676ff36e226805f83a2c",
        },
        {
          url: "/icons/heading-01.svg",
          revision: "891b29c25cdf92960413c1322e4c71a7",
        },
        {
          url: "/icons/heading-02.svg",
          revision: "a3666a3a3d0f3d1d1d3e2998d61a7988",
        },
        {
          url: "/icons/heading-square.svg",
          revision: "a1e4e26f582a83df98edff4383e7418a",
        },
        {
          url: "/icons/headphones-01.svg",
          revision: "35d896299642959901c1b1cec0d038bf",
        },
        {
          url: "/icons/headphones-02.svg",
          revision: "7629d3dd7936d2926f42f9a1a002c38d",
        },
        {
          url: "/icons/heart-circle.svg",
          revision: "46d48b0d72bae58e1063a35af6b8719a",
        },
        {
          url: "/icons/heart-hand.svg",
          revision: "ae75ad9f2ecba47018adca3cba4e4599",
        },
        {
          url: "/icons/heart-octagon.svg",
          revision: "4d3c420bedba58b121b2a7bb99596d0f",
        },
        {
          url: "/icons/heart-rounded.svg",
          revision: "3d30ce8729df6728ac2af87a36ac452f",
        },
        {
          url: "/icons/heart-square.svg",
          revision: "a6a556413c77540e7e232d46ef1b6211",
        },
        {
          url: "/icons/heart.svg",
          revision: "4449eb58b4ebd3389f3edfcc2d955bb0",
        },
        {
          url: "/icons/hearts-ic.svg",
          revision: "ae24c771743782d6cb19aba548300dae",
        },
        {
          url: "/icons/hearts.svg",
          revision: "367bcea252e245e983e10bd866bc12ca",
        },
        {
          url: "/icons/help-circle.svg",
          revision: "7cdaa0e0d516b0a709fcc4578394d3de",
        },
        {
          url: "/icons/help-hexagon.svg",
          revision: "190d6ee81248a4fdd6c065d6421dfa49",
        },
        {
          url: "/icons/help-octagon-1.svg",
          revision: "f8059ce6df4c9ff8fe5ce7ea2ae40f0d",
        },
        {
          url: "/icons/help-octagon.svg",
          revision: "7dcea50ef7160c4b2f9a6134a4db18b1",
        },
        {
          url: "/icons/help-square.svg",
          revision: "453fdceba6c6f434dd63e1cf82c851b1",
        },
        {
          url: "/icons/hexagon-01.svg",
          revision: "e46337ab023a6e18e3d357fc61a38ae0",
        },
        {
          url: "/icons/hexagon-02.svg",
          revision: "16849e708f0668424170b545bdcbcc9b",
        },
        {
          url: "/icons/home-01.svg",
          revision: "452af992b75d1bb06ca59211cfef4631",
        },
        {
          url: "/icons/home-02.svg",
          revision: "262d0dd5f07e6ce13029a00d9f514b63",
        },
        {
          url: "/icons/home-03.svg",
          revision: "59d92fa0da57bee4494a8c45bc99add5",
        },
        {
          url: "/icons/home-04.svg",
          revision: "0ed5eb46c62e5ae31b4c257bddebba99",
        },
        {
          url: "/icons/home-05.svg",
          revision: "a6e2ebacb4993504abc111181f5f4c46",
        },
        {
          url: "/icons/home-line.svg",
          revision: "4ab01876317b2cd1071fcf5d5ed0c2cb",
        },
        {
          url: "/icons/home-smile.svg",
          revision: "83a82be406a5ad4afe9bf301c0d5e245",
        },
        {
          url: "/icons/horizontal-bar-chart-01.svg",
          revision: "f543ae63663297b5a288c7cb2eba8756",
        },
        {
          url: "/icons/horizontal-bar-chart-02.svg",
          revision: "2475d3fb65975c27d7ec87742838c957",
        },
        {
          url: "/icons/horizontal-bar-chart-03.svg",
          revision: "b123e32fb78047f688baf74680596492",
        },
        {
          url: "/icons/hourglass-01.svg",
          revision: "53ade70ebe3b14d72e18cc241d2c003f",
        },
        {
          url: "/icons/hourglass-02.svg",
          revision: "1b5e7ae49f2dd79410f43bd7aa3dfc97",
        },
        {
          url: "/icons/hourglass-03.svg",
          revision: "003b38e69ad1366d1f3d38c36768cb3b",
        },
        {
          url: "/icons/hurricane-01.svg",
          revision: "417427062f5410e6b89df8a079871fda",
        },
        {
          url: "/icons/hurricane-02.svg",
          revision: "ad351f0b87f17a7156b2d0f800343ff1",
        },
        {
          url: "/icons/hurricane-03.svg",
          revision: "32c25b867e000e55d73d1f89ea700306",
        },
        {
          url: "/icons/image-01.svg",
          revision: "d4f9caa2a3884e5afe447242f9c57454",
        },
        {
          url: "/icons/image-02.svg",
          revision: "e77242c8dbb4dc565aa25792460b9ab1",
        },
        {
          url: "/icons/image-03.svg",
          revision: "51c7c27b59a5219429a64bd7a8072d23",
        },
        {
          url: "/icons/image-04.svg",
          revision: "f08d83ec376030392d3b61c89c36c0ab",
        },
        {
          url: "/icons/image-05.svg",
          revision: "fd9eb0e6b40eebe9167c1f37e6ffad70",
        },
        {
          url: "/icons/image-check.svg",
          revision: "a55ee372770125492439618ee3cee4fc",
        },
        {
          url: "/icons/image-down.svg",
          revision: "4a5b01749b6ae442682c03ca1aa25da4",
        },
        {
          url: "/icons/image-indent-left.svg",
          revision: "ac2ac2dd7f1491726e5b3b0800ef8bb7",
        },
        {
          url: "/icons/image-indent-right.svg",
          revision: "efecc8a299e0abb44333bda3159ffa0c",
        },
        {
          url: "/icons/image-left.svg",
          revision: "19fac4cc7ecac9749f86bb99fbd636e0",
        },
        {
          url: "/icons/image-plus.svg",
          revision: "f40b53566c08e82cf4e4bb526a49d05a",
        },
        {
          url: "/icons/image-right.svg",
          revision: "2bcc6f5b1f37cd1ff75d02be9d746189",
        },
        {
          url: "/icons/image-up.svg",
          revision: "5c4efd7ace4316b8063fbf8d84e6ef89",
        },
        {
          url: "/icons/image-user-check.svg",
          revision: "8b41da31ae4393262af1a8731e05d256",
        },
        {
          url: "/icons/image-user-down.svg",
          revision: "b08ad5e83ba2c8baef8b9be89a921c70",
        },
        {
          url: "/icons/image-user-left.svg",
          revision: "4062968e47c9d65df9a38c883e7e0b04",
        },
        {
          url: "/icons/image-user-plus.svg",
          revision: "38aad1f2ff5ddd8f189441a03a6cce33",
        },
        {
          url: "/icons/image-user-right.svg",
          revision: "afac2d48d4871c11526072105feaee96",
        },
        {
          url: "/icons/image-user-up.svg",
          revision: "5f43072ecddeafdc1cd84e69d3c54644",
        },
        {
          url: "/icons/image-user-x.svg",
          revision: "7e24d74b9077247dce110cff1097504d",
        },
        {
          url: "/icons/image-user.svg",
          revision: "3c2b71e91c80d7872b0ea9c022a5d50d",
        },
        {
          url: "/icons/image-x.svg",
          revision: "e059e04d42682c66b5bef6ccd4fc6e70",
        },
        {
          url: "/icons/inbox-01.svg",
          revision: "fa172a1338a6f576793645161c1bcc5e",
        },
        {
          url: "/icons/inbox-02.svg",
          revision: "5170438f6d9df317b80150eac5f6f9ca",
        },
        {
          url: "/icons/infinity.svg",
          revision: "81d5be1807d6990ee2b45b41db070ed2",
        },
        {
          url: "/icons/info-circle.svg",
          revision: "8c680638d62a15b3cc1f6d0089732ba9",
        },
        {
          url: "/icons/info-hexagon.svg",
          revision: "b5eae9c2ff21390ca7a5169066c0a06b",
        },
        {
          url: "/icons/info-octagon.svg",
          revision: "c8f19211541fd3c92c0446ee0996d773",
        },
        {
          url: "/icons/info-square.svg",
          revision: "d3a5b12a438b2f2a889fedc7b1e46a8f",
        },
        {
          url: "/icons/intersect-circle.svg",
          revision: "84842b72a803994fa39a6a4e9abfb202",
        },
        {
          url: "/icons/intersect-square.svg",
          revision: "a45d3859654dc48555a07dc8eeeb079d",
        },
        {
          url: "/icons/italic-01.svg",
          revision: "70f48ea4957daacebe2331dc51718923",
        },
        {
          url: "/icons/italic-02.svg",
          revision: "60b16d56e01d4be931f99ce74125cd6f",
        },
        {
          url: "/icons/italic-square.svg",
          revision: "b0f1b24776a338dbe262a89c847dc1f2",
        },
        {
          url: "/icons/key-01.svg",
          revision: "ab12feff6f0e395cc3b1b68e7fe7592e",
        },
        {
          url: "/icons/key-02.svg",
          revision: "1f1ec869a788cecd8f4bd0eea76184c4",
        },
        {
          url: "/icons/keyboard-01.svg",
          revision: "ac426b6dd667ce72ba6b275689400ba8",
        },
        {
          url: "/icons/keyboard-02.svg",
          revision: "53d47528b8f80d8d74ac6648cba0fac3",
        },
        {
          url: "/icons/laptop-01.svg",
          revision: "80b0478e0b46c6b998b6788ea5a8bc7c",
        },
        {
          url: "/icons/laptop-02.svg",
          revision: "bb3254ed753a88abf46c2251248ca334",
        },
        {
          url: "/icons/layer-single.svg",
          revision: "f80ab5ca3e4c1dda874e7cee8bf70292",
        },
        {
          url: "/icons/layers-three-01.svg",
          revision: "077fa61b9538051432fec6ee620ea09c",
        },
        {
          url: "/icons/layers-three-02.svg",
          revision: "81be159b0e3832a744beeec12cf28107",
        },
        {
          url: "/icons/layers-two-01.svg",
          revision: "617b5576c051e630e5101967e4362cbf",
        },
        {
          url: "/icons/layers-two-02.svg",
          revision: "aa252be174b984e95e7b79ba7f8ab914",
        },
        {
          url: "/icons/layout-alt-01.svg",
          revision: "bf358a19c97b6e016e1804f48cf3e054",
        },
        {
          url: "/icons/layout-alt-02.svg",
          revision: "55b1979790e1da7ae00a871ca51b404e",
        },
        {
          url: "/icons/layout-alt-03.svg",
          revision: "45da5601928513d50f723d7d4828db6b",
        },
        {
          url: "/icons/layout-alt-04.svg",
          revision: "f5d4539986d6c101945c00bf9fb547ad",
        },
        {
          url: "/icons/layout-bottom.svg",
          revision: "0fe95cbde74a44ff764c4d545341a131",
        },
        {
          url: "/icons/layout-grid-01.svg",
          revision: "fd648a98bcedda0b586880ef351652b1",
        },
        {
          url: "/icons/layout-grid-02.svg",
          revision: "0c27602424ac40f4f6bdada099250904",
        },
        {
          url: "/icons/layout-left.svg",
          revision: "3c78274c084dc8f4e85b131d46bc6997",
        },
        {
          url: "/icons/layout-right.svg",
          revision: "c3517f354145d16c69c6b3cf07918b52",
        },
        {
          url: "/icons/layout-top.svg",
          revision: "00497a9838ba168d27f67c12c0614ad9",
        },
        {
          url: "/icons/left-indent-01.svg",
          revision: "de40e023a0170a1c1ae1e6e7377fb070",
        },
        {
          url: "/icons/left-indent-02.svg",
          revision: "019f9989b28b2b1b53fde7457fa55390",
        },
        {
          url: "/icons/letter-spacing-01.svg",
          revision: "971e1cd2a34cf22255523b85b7de8e99",
        },
        {
          url: "/icons/letter-spacing-02.svg",
          revision: "0d1c85d865358a5cb6f44f47cfa396fc",
        },
        {
          url: "/icons/life-buoy-01.svg",
          revision: "7372e5ff3e7fbab1823e97dc14236246",
        },
        {
          url: "/icons/life-buoy-02.svg",
          revision: "9ad455090b0c10c1cc423177f36b8d48",
        },
        {
          url: "/icons/lightbulb-01.svg",
          revision: "09402b090bc1993c39e2dcbdc036e091",
        },
        {
          url: "/icons/lightbulb-02.svg",
          revision: "89e6fb458a74e9f5ab91a43cc5dfbc0b",
        },
        {
          url: "/icons/lightbulb-03.svg",
          revision: "ca4222483e4149c10785a60241408007",
        },
        {
          url: "/icons/lightbulb-04.svg",
          revision: "524eb7233dfb27d97eb0672e476ac25e",
        },
        {
          url: "/icons/lightbulb-05.svg",
          revision: "3857870b49d7d58a0bb5e78fde7593f5",
        },
        {
          url: "/icons/lightning-01.svg",
          revision: "e1ea657a777c26534df375955dc7a972",
        },
        {
          url: "/icons/lightning-02.svg",
          revision: "307365d348c6d0b036aa4308c2ac93c2",
        },
        {
          url: "/icons/line-chart-down-01.svg",
          revision: "2265bcf4927bc65c499cb2deb9eec854",
        },
        {
          url: "/icons/line-chart-down-02.svg",
          revision: "85447725ee2bd9a76bbd7518ef1d5bcf",
        },
        {
          url: "/icons/line-chart-down-03.svg",
          revision: "dc97f7eecdffc0381c34d0f6543de21a",
        },
        {
          url: "/icons/line-chart-down-04.svg",
          revision: "e7cf31708d7f57d19c8f1f379662ad38",
        },
        {
          url: "/icons/line-chart-down-05.svg",
          revision: "9ba41393e46a2af5ed7018d60851c0ad",
        },
        {
          url: "/icons/line-chart-up-01.svg",
          revision: "6457ccc4a451c9946bbaa9c2341502d4",
        },
        {
          url: "/icons/line-chart-up-02.svg",
          revision: "002cef9d1cc5f0cf7d4c2756a32e7992",
        },
        {
          url: "/icons/line-chart-up-03.svg",
          revision: "e70211bc4493db6b2db2901ea255a6d5",
        },
        {
          url: "/icons/line-chart-up-04.svg",
          revision: "6edec2eeef2d0aa905e0d4f2728aa002",
        },
        {
          url: "/icons/line-chart-up-05.svg",
          revision: "5191eafad98a442d7e35d9fe21f17bc4",
        },
        {
          url: "/icons/line-height.svg",
          revision: "ec35b59203a4ee98173b75c7c7d841f5",
        },
        {
          url: "/icons/link-01.svg",
          revision: "c8ca6826509ba8544c62b849d9aa80e5",
        },
        {
          url: "/icons/link-02.svg",
          revision: "557cd49e80d488c141524f31fc32f51f",
        },
        {
          url: "/icons/link-03.svg",
          revision: "2d0439510ad92f0c626df506d18e9ce9",
        },
        {
          url: "/icons/link-04.svg",
          revision: "e5021dc709f139c9ee9e483e34f8896c",
        },
        {
          url: "/icons/link-05.svg",
          revision: "6961f3c241c1f3cc5132887df45b8d40",
        },
        {
          url: "/icons/link-broken-01.svg",
          revision: "b581a73ab76d80d5709abc17d90f6174",
        },
        {
          url: "/icons/link-broken-02.svg",
          revision: "accba2295cd6b653642f2efa46c06a2f",
        },
        {
          url: "/icons/link-external-01.svg",
          revision: "cf8e786a354ae2aa36713345bec6cfe6",
        },
        {
          url: "/icons/link-external-02.svg",
          revision: "44596dd1ea4622030abcb897f43a96f8",
        },
        {
          url: "/icons/list.svg",
          revision: "608e644fc4f3ca5da2d5d873f6b40bfe",
        },
        {
          url: "/icons/loading-01.svg",
          revision: "ba0f38115fa63150b783fa0e1e2b2e59",
        },
        {
          url: "/icons/loading-02.svg",
          revision: "1b3c3baa531b50e1a6187d534e08416a",
        },
        {
          url: "/icons/loading-03.svg",
          revision: "a060cc19e0c3e46ec5ab66caaa4e47f5",
        },
        {
          url: "/icons/lock-01.svg",
          revision: "60c6fb719aa5828d23a9eae7e3357bbb",
        },
        {
          url: "/icons/lock-02.svg",
          revision: "5aa63e5b42a5e67c08b58671645fc661",
        },
        {
          url: "/icons/lock-03.svg",
          revision: "b2064d38724c625d3b8a9f9a2198dc88",
        },
        {
          url: "/icons/lock-04.svg",
          revision: "3d93fb8bbac315150e3b71247beb60ab",
        },
        {
          url: "/icons/lock-keyhole-circle.svg",
          revision: "5586159c36662241bae014c9684ce7a2",
        },
        {
          url: "/icons/lock-keyhole-square.svg",
          revision: "c69b3a7a48399a6287f50a68fdfdcb76",
        },
        {
          url: "/icons/lock-unlocked-01.svg",
          revision: "e05911fd0a8d2386fc06fe8a7b2cce66",
        },
        {
          url: "/icons/lock-unlocked-02.svg",
          revision: "34e31d1a2d84d63eb570f204d167cc7c",
        },
        {
          url: "/icons/lock-unlocked-03.svg",
          revision: "57d6f4522e8069961bcff5473d474cad",
        },
        {
          url: "/icons/lock-unlocked-04.svg",
          revision: "79557adcd1582d35618232af2c4171a4",
        },
        {
          url: "/icons/log-in-01.svg",
          revision: "2ebbcb4aa6ed6c19f383ed3088796229",
        },
        {
          url: "/icons/log-in-02.svg",
          revision: "2c21a8d0e5d7218b786b86108aeadb76",
        },
        {
          url: "/icons/log-in-03.svg",
          revision: "4fa2d2c50413a74872ec15f427fb801a",
        },
        {
          url: "/icons/log-in-04.svg",
          revision: "e4462f8b2d176ba0515afb792432da13",
        },
        {
          url: "/icons/log-out-01.svg",
          revision: "fb7c50210edb1379af81c9e2852aabca",
        },
        {
          url: "/icons/log-out-02.svg",
          revision: "02357a285020ccccf4712c3c907271f5",
        },
        {
          url: "/icons/log-out-03.svg",
          revision: "3366d2a0e6b97ea09cd6a128ea59741c",
        },
        {
          url: "/icons/log-out-04.svg",
          revision: "ffb087ecd4c7355919f174a21cc7f360",
        },
        {
          url: "/icons/luggage-01.svg",
          revision: "61d36aa07ef6f194f91e74b76c7375cd",
        },
        {
          url: "/icons/luggage-02.svg",
          revision: "e9c0cf6791de791d7300914ed3ae8677",
        },
        {
          url: "/icons/luggage-03.svg",
          revision: "f7adda6a92a1a3d0aa7c62b2061740a0",
        },
        {
          url: "/icons/magic-wand-01.svg",
          revision: "a384a6b27471caf3ac1a758fd0c8cfd6",
        },
        {
          url: "/icons/magic-wand-02.svg",
          revision: "9f2748a71caab64076d82b5d251d5269",
        },
        {
          url: "/icons/mail-01.svg",
          revision: "fd4563ba6325b6eb6fe05b074685a9b6",
        },
        {
          url: "/icons/mail-02.svg",
          revision: "72093e5104f1453e51727cb7b1963eb7",
        },
        {
          url: "/icons/mail-03.svg",
          revision: "7b92e5c8e02f6de4507da29e4b24e9cb",
        },
        {
          url: "/icons/mail-04.svg",
          revision: "e9a2318eb90f9a61e1ff3569672d24e4",
        },
        {
          url: "/icons/mail-05.svg",
          revision: "e143d1cb9a46362e2dadcee478fca9d7",
        },
        {
          url: "/icons/map-01.svg",
          revision: "c218153bb00ce739d05897b86f22589c",
        },
        {
          url: "/icons/map-02.svg",
          revision: "ca90991bb4b6f1103c8f364a9fc3fe91",
        },
        {
          url: "/icons/mark.svg",
          revision: "068a587883a8bcf3ab121bf73c21da2b",
        },
        {
          url: "/icons/marker-pin-01.svg",
          revision: "70eb2ef96da8e8f1659cc2b32b3b343a",
        },
        {
          url: "/icons/marker-pin-02.svg",
          revision: "b564b7bba0126234f2f76d1d9221ab56",
        },
        {
          url: "/icons/marker-pin-03.svg",
          revision: "2ce8944c63c0aa64de950bb51cf2cd7f",
        },
        {
          url: "/icons/marker-pin-04.svg",
          revision: "17241e83c1bef745ed0de24e804a26e4",
        },
        {
          url: "/icons/marker-pin-05.svg",
          revision: "7787036f93010419007001ddb3dd2faf",
        },
        {
          url: "/icons/marker-pin-06.svg",
          revision: "058f5d30b696191f417a06e65cb9aa37",
        },
        {
          url: "/icons/maximize-01.svg",
          revision: "bc5b9fd8067a3c65ba9aa32c2897baf7",
        },
        {
          url: "/icons/maximize-02.svg",
          revision: "b895aa759d124136cdf3dcdfde1f8744",
        },
        {
          url: "/icons/medical-circle.svg",
          revision: "7fc3bd777d7f0c4bb1c846864bf658b3",
        },
        {
          url: "/icons/medical-cross.svg",
          revision: "0d669176627644f2d26e33cbf51526dc",
        },
        {
          url: "/icons/medical-square.svg",
          revision: "2ce0c1ba9799c926d968608ef4acd8fb",
        },
        {
          url: "/icons/menu-01.svg",
          revision: "103ec705640463b5293986b6658100a4",
        },
        {
          url: "/icons/menu-02.svg",
          revision: "1dafb89e787210aca0664c4b7d26a2a5",
        },
        {
          url: "/icons/menu-03.svg",
          revision: "4950f0b5b0b7105bffe91d29f6bb6731",
        },
        {
          url: "/icons/menu-04.svg",
          revision: "13b50a258098549fa603f04997ca497c",
        },
        {
          url: "/icons/menu-05.svg",
          revision: "faf1425966d91df61490ed011181072d",
        },
        {
          url: "/icons/message-alert-circle.svg",
          revision: "50862ea419007e69f3c7aad9c2d7f643",
        },
        {
          url: "/icons/message-alert-square.svg",
          revision: "3da5da3492b565979d416ebb6e8286aa",
        },
        {
          url: "/icons/message-chat-circle.svg",
          revision: "9eeef9241e5e35c0d303fda7f8aba002",
        },
        {
          url: "/icons/message-chat-square.svg",
          revision: "bddf7357e8c9e3d15e9d18be2e28b0ad",
        },
        {
          url: "/icons/message-check-circle.svg",
          revision: "7824277b928c6f5ae8d7d0483e4c1857",
        },
        {
          url: "/icons/message-check-square.svg",
          revision: "ecfd406757506b8f805aaf3ca27acc9c",
        },
        {
          url: "/icons/message-circle-01.svg",
          revision: "2c60949b114c470b22adbc24f66282bd",
        },
        {
          url: "/icons/message-circle-02.svg",
          revision: "97dbc04fc3803d2dd5fb45a558a9d2e4",
        },
        {
          url: "/icons/message-dots-circle.svg",
          revision: "4a7b8fc8011c85a05e01319a3c3aae18",
        },
        {
          url: "/icons/message-dots-square.svg",
          revision: "11b8ae0dfdbfc9ad5939bcca2c02d269",
        },
        {
          url: "/icons/message-heart-circle.svg",
          revision: "6087ca92649674c0925270042f36f7d1",
        },
        {
          url: "/icons/message-heart-square.svg",
          revision: "0d5303248863f780a3c21cfb7af7bd95",
        },
        {
          url: "/icons/message-notification-circle.svg",
          revision: "29d8ae0a8af079f9bbfd2c0d63c966e3",
        },
        {
          url: "/icons/message-notification-square-1.svg",
          revision: "fea3c7e4c7c0777c709cc70e1811f51f",
        },
        {
          url: "/icons/message-notification-square.svg",
          revision: "fea3c7e4c7c0777c709cc70e1811f51f",
        },
        {
          url: "/icons/message-plus-circle.svg",
          revision: "44b5016a7a81172c3625955a51599258",
        },
        {
          url: "/icons/message-plus-square.svg",
          revision: "5efb8f03fb9681f84545d62e3e9e9ed2",
        },
        {
          url: "/icons/message-question-circle.svg",
          revision: "0a813b5f3036d5d2eb8f8f3f5d757139",
        },
        {
          url: "/icons/message-question-square.svg",
          revision: "d0ec5f43e109571d075e2e1ebb115744",
        },
        {
          url: "/icons/message-smile-circle.svg",
          revision: "7ff14c4705d20f183cda6ddca87c8b99",
        },
        {
          url: "/icons/message-smile-square.svg",
          revision: "5556087b7af37a9a3384084717153c89",
        },
        {
          url: "/icons/message-square-01.svg",
          revision: "6ca92e51b45670b16fc529ecc4f5358a",
        },
        {
          url: "/icons/message-square-02.svg",
          revision: "7eeae202d6e26d51f0a3a4d401d683b4",
        },
        {
          url: "/icons/message-text-circle-01.svg",
          revision: "4f5e64dc9bc69304d647f72697e12b17",
        },
        {
          url: "/icons/message-text-circle-02.svg",
          revision: "8320557630fd4f0a9bcd069cdfbc6380",
        },
        {
          url: "/icons/message-text-square-01.svg",
          revision: "44bbeb8b8bcb10578cd9cb0f8519f085",
        },
        {
          url: "/icons/message-text-square-02.svg",
          revision: "825fb01e257418320d0fb81b31002b64",
        },
        {
          url: "/icons/message-x-circle.svg",
          revision: "6bf2c2dd973b71daa70466f92cacc4a5",
        },
        {
          url: "/icons/message-x-square.svg",
          revision: "fc089f1182e1b53b773053be61706616",
        },
        {
          url: "/icons/microphone-01.svg",
          revision: "b488124ec96bf7b2895fcfb1019a340c",
        },
        {
          url: "/icons/microphone-02.svg",
          revision: "10cb2612cd38f79f60c10e5b1ea59f84",
        },
        {
          url: "/icons/microphone-off-01.svg",
          revision: "bd92e1ba9abf37c6e9c2303ef858a4f0",
        },
        {
          url: "/icons/microphone-off-02.svg",
          revision: "1c871658445f73bac8139a9b934bd60a",
        },
        {
          url: "/icons/microscope.svg",
          revision: "400e8a704c87c47b9ca2ce719363469a",
        },
        {
          url: "/icons/minimize-01.svg",
          revision: "f921335255da474789b283c95cb6cf4c",
        },
        {
          url: "/icons/minimize-02.svg",
          revision: "a4851e0680c68b39b21a44cbc4498a50",
        },
        {
          url: "/icons/minus-circle.svg",
          revision: "887a02123e943b76e6efee61f6446737",
        },
        {
          url: "/icons/minus-square.svg",
          revision: "7a863262e53a0bfaea145a4105794005",
        },
        {
          url: "/icons/minus.svg",
          revision: "10f9774d10cd0e436aa03b4ce60d9a8f",
        },
        {
          url: "/icons/modem-01.svg",
          revision: "6b4c863156a77cd6c9ba720f50b09ae2",
        },
        {
          url: "/icons/modem-02.svg",
          revision: "72705ff07301be91f13b1bfe76331796",
        },
        {
          url: "/icons/monitor-01.svg",
          revision: "f40c20a1c48d6842785e302322ba6eaf",
        },
        {
          url: "/icons/monitor-02.svg",
          revision: "ea0748774ceada9efa5389ea721a588e",
        },
        {
          url: "/icons/monitor-03.svg",
          revision: "2197f8a3b2db318f25cc5fdd8946fd24",
        },
        {
          url: "/icons/monitor-04.svg",
          revision: "079f1a1b7d8f3e3c960b490835dc99fe",
        },
        {
          url: "/icons/monitor-05.svg",
          revision: "5de6bd5281f4a827b53d7b7544fa8836",
        },
        {
          url: "/icons/moon-01.svg",
          revision: "05e501744177876ca3e14af4181caf60",
        },
        {
          url: "/icons/moon-02.svg",
          revision: "d8f91da3a4b6832d198b6ec99e63d295",
        },
        {
          url: "/icons/moon-eclipse.svg",
          revision: "db44fba04dada51f6bcf8d2cdcf21e8a",
        },
        {
          url: "/icons/moon-star.svg",
          revision: "e69575491a85fded996b25ceca31aeba",
        },
        {
          url: "/icons/mouse.svg",
          revision: "9e79389f31fe3b6c684503a9c3bb46a5",
        },
        {
          url: "/icons/move.svg",
          revision: "3b769b6eb79a9800d6699d79ac21b845",
        },
        {
          url: "/icons/music-note-01.svg",
          revision: "7bbea1db207352313e9fb054e5e52ae0",
        },
        {
          url: "/icons/music-note-02.svg",
          revision: "15398125a0ca92ad3de0645440afad88",
        },
        {
          url: "/icons/music.svg",
          revision: "ad3aa262ea6f2701538aa0b5df0e00e8",
        },
        {
          url: "/icons/navigation-pointer-01.svg",
          revision: "09ac80d062900e7b0d44c965e2bb6c20",
        },
        {
          url: "/icons/navigation-pointer-02.svg",
          revision: "5bd7e76a1acc3de261b1cef3d222b561",
        },
        {
          url: "/icons/navigation-pointer-off-01.svg",
          revision: "1c32ba54e69c408e8c4396b4a8c07b70",
        },
        {
          url: "/icons/navigation-pointer-off-02.svg",
          revision: "387622db395fe74cc5e41da090b37aa6",
        },
        {
          url: "/icons/notification-box.svg",
          revision: "c48bcef8a1470a1da63b68dfc89b0444",
        },
        {
          url: "/icons/notification-text.svg",
          revision: "a8099681e90f381283f171ce40885753",
        },
        {
          url: "/icons/octagon.svg",
          revision: "d704545d23541a66f8361c35f7e6b28c",
        },
        {
          url: "/icons/package-check.svg",
          revision: "eaeec49d2195fdded43dd4e1e2197ef3",
        },
        {
          url: "/icons/package-minus.svg",
          revision: "05c6ff889e0a236be80f465840c6e243",
        },
        {
          url: "/icons/package-plus.svg",
          revision: "2f23268add102234ac423820055d54bd",
        },
        {
          url: "/icons/package-search.svg",
          revision: "83f77c59ad6564de8392c5045885ab96",
        },
        {
          url: "/icons/package-x.svg",
          revision: "94c15913c65c259eb8c4cf274a5f778f",
        },
        {
          url: "/icons/package.svg",
          revision: "8f7d04ec3b307464d6168fb18909b7b3",
        },
        {
          url: "/icons/paint-pour.svg",
          revision: "f8164c9eb2b073d84577746d7875238e",
        },
        {
          url: "/icons/paint.svg",
          revision: "0e90158bc47c417d0839b488868a66f6",
        },
        {
          url: "/icons/palette.svg",
          revision: "d9ab54dea818edfdb5a3defaa10f334b",
        },
        {
          url: "/icons/paperclip.svg",
          revision: "e5bc948320f877a7f39458d7f14dfee7",
        },
        {
          url: "/icons/paragraph-spacing.svg",
          revision: "be23581d447250b839db58bbe5afbe9b",
        },
        {
          url: "/icons/paragraph-wrap.svg",
          revision: "bc0e6563809fe5521696470d22a4f92d",
        },
        {
          url: "/icons/passcode-lock.svg",
          revision: "74389302daa4ad0bd751d7a08222503a",
        },
        {
          url: "/icons/passcode.svg",
          revision: "0d3b4b578aca1551bb0bbdd89dd2c1db",
        },
        {
          url: "/icons/passport.svg",
          revision: "67e6b33ff76db3d887a4dd078beb50a7",
        },
        {
          url: "/icons/pause-circle.svg",
          revision: "903344106d6630cb0848fce9ccef9ec9",
        },
        {
          url: "/icons/pause-square.svg",
          revision: "96dd2ad7c76e52db5cc13940a2e4094e",
        },
        {
          url: "/icons/pen-tool-01.svg",
          revision: "18379f919ee263729f3866ea1380801f",
        },
        {
          url: "/icons/pen-tool-02.svg",
          revision: "1d38aa84c3a95aee9e26ebe3c44091db",
        },
        {
          url: "/icons/pen-tool-minus.svg",
          revision: "0088b53b288ead19c599ab1f2a94be61",
        },
        {
          url: "/icons/pen-tool-plus.svg",
          revision: "6cb5b95f897f38456606b2d63e13efc9",
        },
        {
          url: "/icons/pencil-01.svg",
          revision: "02dab5447e80a813537961cfe8c06e87",
        },
        {
          url: "/icons/pencil-02.svg",
          revision: "a17aff550b2980b097816775eb1a9576",
        },
        {
          url: "/icons/pencil-line.svg",
          revision: "1a3d0f8613a8bde974203ab11bd8f686",
        },
        {
          url: "/icons/pentagon.svg",
          revision: "799a3e3b121b0fccef97453d6a7f2958",
        },
        {
          url: "/icons/percent-01.svg",
          revision: "c57ab90b2095e2545f9227a68b52975e",
        },
        {
          url: "/icons/percent-02.svg",
          revision: "8bd7e36164c314f454236881e3c634ae",
        },
        {
          url: "/icons/percent-03.svg",
          revision: "55a6e2bb7bcf5a8c4ea86b1b8bf648bd",
        },
        {
          url: "/icons/perspective-01.svg",
          revision: "58c12abe883198c8fb52f6d2868bcec4",
        },
        {
          url: "/icons/perspective-02.svg",
          revision: "dfd10faf3e61b60f23f7ebb8012e0ee2",
        },
        {
          url: "/icons/phone-01.svg",
          revision: "845b36f1693c5dd820f619b39adb440d",
        },
        {
          url: "/icons/phone-02.svg",
          revision: "7141fba9682f6b39a3ff2308f06a297f",
        },
        {
          url: "/icons/phone-call-01.svg",
          revision: "840c0ac32ecd78d5d3d2e7bdd76e21c1",
        },
        {
          url: "/icons/phone-call-02.svg",
          revision: "88efe3a67917e19c3268fdccbf9209a5",
        },
        {
          url: "/icons/phone-hang-up.svg",
          revision: "dbc241d208272d256c6922e2c661fb24",
        },
        {
          url: "/icons/phone-incoming-01.svg",
          revision: "b46e12be0fa37a9c0c43e50c4b1b9957",
        },
        {
          url: "/icons/phone-incoming-02.svg",
          revision: "e2e88ccd4f2878857a276fa318c41e1d",
        },
        {
          url: "/icons/phone-outgoing-01.svg",
          revision: "5ce39e8b0155f021f29513c37a882341",
        },
        {
          url: "/icons/phone-outgoing-02.svg",
          revision: "8c96556fac979b6048264321bbce4886",
        },
        {
          url: "/icons/phone-pause.svg",
          revision: "9053ebb0721d578c3eaed325da6dede0",
        },
        {
          url: "/icons/phone-plus.svg",
          revision: "bd0b564f24bde88fe104930e0e9cea49",
        },
        {
          url: "/icons/phone-x.svg",
          revision: "1a6d62ac5adf4fb68f109ebe15ba86e2",
        },
        {
          url: "/icons/phone.svg",
          revision: "c2944b7b582adba21bf306fd248f75f7",
        },
        {
          url: "/icons/pie-chart-01.svg",
          revision: "0cc7ea092cc58bf68366ce5ea5d41033",
        },
        {
          url: "/icons/pie-chart-02.svg",
          revision: "902fa7bd08b5097079b758e99722a79b",
        },
        {
          url: "/icons/pie-chart-03.svg",
          revision: "b6c2edb729e842015871e48347460605",
        },
        {
          url: "/icons/pie-chart-04.svg",
          revision: "a03ca55488bb702fd82263b4adb0f3ae",
        },
        {
          url: "/icons/piggy-bank-01.svg",
          revision: "452f9cf580e82063e8f796b9483d7176",
        },
        {
          url: "/icons/piggy-bank-02.svg",
          revision: "4da75f8355643d1df0db74aa77659ab2",
        },
        {
          url: "/icons/pilcrow-01.svg",
          revision: "38c523ff7d40edb4f7c57b45cd7c4c78",
        },
        {
          url: "/icons/pilcrow-02.svg",
          revision: "6768e5a5ba5e30e15e8cf223a79fbfae",
        },
        {
          url: "/icons/pilcrow-square.svg",
          revision: "2565328192c9403547eb4b80a0fff90a",
        },
        {
          url: "/icons/pin-01.svg",
          revision: "08a239ebba69d0d1ddecaa87d9b7e5e6",
        },
        {
          url: "/icons/pin-02.svg",
          revision: "c290ca09febcf360c389b0949ccec8b4",
        },
        {
          url: "/icons/placeholder.svg",
          revision: "2986580e42bc0e7f8e5168a124dd75a3",
        },
        {
          url: "/icons/play-circle.svg",
          revision: "0570a6fafa85a9ed3ae9e38fd8f5ce64",
        },
        {
          url: "/icons/play-square.svg",
          revision: "c391b0d8bd67da1022786bb09936d428",
        },
        {
          url: "/icons/play.svg",
          revision: "62edbc6a0f5504f19b23182d0f3115cf",
        },
        {
          url: "/icons/plus-circle.svg",
          revision: "3109ce9fb6fd348356d1175cc9623c1e",
        },
        {
          url: "/icons/plus-square.svg",
          revision: "35fc753b375642589d8ca6ede1a0c85d",
        },
        {
          url: "/icons/plus.svg",
          revision: "46a1e8c051ff209f4501ead1106d084a",
        },
        {
          url: "/icons/podcast.svg",
          revision: "3401fcdb9c4df591ebb9ab089656b0bf",
        },
        {
          url: "/icons/power-01.svg",
          revision: "fef7964ffc6646ab8103a73f8ca719b4",
        },
        {
          url: "/icons/power-02.svg",
          revision: "04dd86d52e80fab7dbe221d1aa4fdd7d",
        },
        {
          url: "/icons/power-03.svg",
          revision: "fa2248df13bf83327529ec0aec511a41",
        },
        {
          url: "/icons/presentation-chart-01.svg",
          revision: "02ec22e03c2c2a5ec248096384ead9c3",
        },
        {
          url: "/icons/presentation-chart-02.svg",
          revision: "cb5197a5339a6ca8d0b00e7eb8859a9f",
        },
        {
          url: "/icons/presentation-chart-03.svg",
          revision: "ad742b14ffde7f4b641b34849f91c3f5",
        },
        {
          url: "/icons/printer.svg",
          revision: "d27e9f07939ddf7613973958b6d3b8d8",
        },
        {
          url: "/icons/puzzle-piece-02.svg",
          revision: "a587052e5ea5072a367a31df4d73994d",
        },
        {
          url: "/icons/puzzle-piece.svg",
          revision: "7dcd55b3959631d39e57d5c5cd836f9a",
        },
        {
          url: "/icons/qr-code-01.svg",
          revision: "b1d98b547296907622ef025f47a8f3c0",
        },
        {
          url: "/icons/qr-code-02.svg",
          revision: "18175c46425941c3befc406be34fe19e",
        },
        {
          url: "/icons/receipt-check.svg",
          revision: "7420ceef857cb1c9e4774072c2d5f008",
        },
        {
          url: "/icons/receipt.svg",
          revision: "79264d0a3ffe5234a5ae7f6928d0cfad",
        },
        {
          url: "/icons/recording-01.svg",
          revision: "7ab53914539d7df1bee583f18593511f",
        },
        {
          url: "/icons/recording-02.svg",
          revision: "d0084d48a8ccfcc4bdaba793b40a5a1f",
        },
        {
          url: "/icons/recording-03.svg",
          revision: "64cc7048e8639fcf813be594a44c48b9",
        },
        {
          url: "/icons/reflect-01.svg",
          revision: "2c80ce07a5d3b4a682de0d4581692ac4",
        },
        {
          url: "/icons/reflect-02.svg",
          revision: "435b02f55daafb9449111d1daa172d54",
        },
        {
          url: "/icons/refresh-ccw-01.svg",
          revision: "7bf65be2d8343c28b1fef406b6c988f0",
        },
        {
          url: "/icons/refresh-ccw-02.svg",
          revision: "2f868619294ec6180d75411d691114ce",
        },
        {
          url: "/icons/refresh-ccw-03.svg",
          revision: "e2f380f9b45d38ef62b85a3b70391d02",
        },
        {
          url: "/icons/refresh-ccw-04.svg",
          revision: "5e1e3a8e1476a448801fb7ad62f8aa08",
        },
        {
          url: "/icons/refresh-ccw-05.svg",
          revision: "b1297677ae0976b4323a93e70faa16a0",
        },
        {
          url: "/icons/refresh-cw-01.svg",
          revision: "ac543fc41e0bfcef37438d54fb5f8ed7",
        },
        {
          url: "/icons/refresh-cw-02.svg",
          revision: "203e768133e401177690a9dc042fc999",
        },
        {
          url: "/icons/refresh-cw-03.svg",
          revision: "ee5fd40f137215d48bb4f0fdcbd32962",
        },
        {
          url: "/icons/refresh-cw-04.svg",
          revision: "9a5f904a31293d80079470b2b381845e",
        },
        {
          url: "/icons/refresh-cw-05.svg",
          revision: "a0753d54f26990d676b46a40a5d1e820",
        },
        {
          url: "/icons/repeat-01.svg",
          revision: "be80a34f4e61819ec41841b78594792e",
        },
        {
          url: "/icons/repeat-02.svg",
          revision: "97262392e2548cde053ff67335de2fe4",
        },
        {
          url: "/icons/repeat-03.svg",
          revision: "064227be8f9a2ec1be1514078d6aa297",
        },
        {
          url: "/icons/repeat-04.svg",
          revision: "6fa0ea99a0c0549d86706d0401bf6af8",
        },
        {
          url: "/icons/reverse-left.svg",
          revision: "58560de95f4b6b7da6d3a9ff4e2e5733",
        },
        {
          url: "/icons/reverse-right.svg",
          revision: "aba7824d7817d0f6cb8e20e08bdda25d",
        },
        {
          url: "/icons/right-indent-01.svg",
          revision: "bfc46f921d30c876d5c110295efd4e92",
        },
        {
          url: "/icons/right-indent-02.svg",
          revision: "4694892a69c39d9118979fab892d41d6",
        },
        {
          url: "/icons/rocket-01.svg",
          revision: "0db069c06fdbc130f6fcda6cfdb3a819",
        },
        {
          url: "/icons/rocket-02.svg",
          revision: "f630cdfffbdc467b291ec78eaf11da2f",
        },
        {
          url: "/icons/roller-brush.svg",
          revision: "5c692b2ec7467ba86541b748f5314db0",
        },
        {
          url: "/icons/route.svg",
          revision: "5a0edf670b9f7ed65a2d2089a158fd2d",
        },
        {
          url: "/icons/rows-01.svg",
          revision: "40196fdf5bde59e6983a84c4fae1e910",
        },
        {
          url: "/icons/rows-02.svg",
          revision: "305fa65abfd20236536af639e63baff6",
        },
        {
          url: "/icons/rows-03.svg",
          revision: "bdb0469b05b18cef1b759ce31d6ff2b5",
        },
        {
          url: "/icons/rss-01.svg",
          revision: "0d1a1c91084b6f19d634a59732b8acb3",
        },
        {
          url: "/icons/rss-02.svg",
          revision: "328f721451923b554f13347d5033a419",
        },
        {
          url: "/icons/ruler.svg",
          revision: "d6c9cb8cfdb6daf5eaac9e481e412e64",
        },
        {
          url: "/icons/safe.svg",
          revision: "34d62c3aede945c48b93abe99800d1fc",
        },
        {
          url: "/icons/sale-01.svg",
          revision: "4e25a82710d602005921a830048a553c",
        },
        {
          url: "/icons/sale-02.svg",
          revision: "05e630439345b229774fe26fc323e4bf",
        },
        {
          url: "/icons/sale-03.svg",
          revision: "0eedfc402918fea9f944eb2d135d5ebc",
        },
        {
          url: "/icons/sale-04.svg",
          revision: "d40885cfd48e24d46bc88e5684a7ab06",
        },
        {
          url: "/icons/save-01.svg",
          revision: "3fdd06d6509cebaababbd4e2ad79206b",
        },
        {
          url: "/icons/save-02.svg",
          revision: "0d868f475ee3a24ceee194db99fcbaf3",
        },
        {
          url: "/icons/save-03.svg",
          revision: "e0a18b482c1658bbb0768d77c96684f3",
        },
        {
          url: "/icons/scale-01.svg",
          revision: "94efad400b813f40ba03428158351873",
        },
        {
          url: "/icons/scale-02.svg",
          revision: "cad519a023db7e9761e5e93189b5eade",
        },
        {
          url: "/icons/scale-03.svg",
          revision: "01b673d11c9a0676327231206297efb7",
        },
        {
          url: "/icons/scales-01.svg",
          revision: "95d2cd6f65e48c74bf44b4f3316b90f3",
        },
        {
          url: "/icons/scales-02.svg",
          revision: "a75bfb9aeab4636783c0a3adef0860c0",
        },
        {
          url: "/icons/scan.svg",
          revision: "121ea9a72c975b61c4cd18342c34b2d6",
        },
        {
          url: "/icons/scissors-01.svg",
          revision: "0ad8da4fad3564afbbc5564a013b217a",
        },
        {
          url: "/icons/scissors-02.svg",
          revision: "704abfa5c2cfb8c444bf9fcbb9cc570d",
        },
        {
          url: "/icons/scissors-cut-01.svg",
          revision: "cea456091f3cd0de9e50c981648e19a0",
        },
        {
          url: "/icons/scissors-cut-02.svg",
          revision: "b5a632c9b5a911b96cf646d5c5589885",
        },
        {
          url: "/icons/search-lg.svg",
          revision: "7f87aae7b4884861af0308983f7196d7",
        },
        {
          url: "/icons/search-md.svg",
          revision: "bedad43d88fc5ff36c977c9ceb695fc6",
        },
        {
          url: "/icons/search-refraction.svg",
          revision: "0a37405473afa11489cfbeaaf416a08e",
        },
        {
          url: "/icons/search-sm.svg",
          revision: "d50ca07d5bad99492660335c37eec70a",
        },
        {
          url: "/icons/send-01.svg",
          revision: "114e6f224dfb0401764065f18e347b36",
        },
        {
          url: "/icons/send-02.svg",
          revision: "442cee1699343a4727dc506e4064c81a",
        },
        {
          url: "/icons/send-03.svg",
          revision: "b861d7185bc13fcc68873edfbd9854a1",
        },
        {
          url: "/icons/server-01.svg",
          revision: "4e51731e5b608fcdd88e5a894a0d43ee",
        },
        {
          url: "/icons/server-02.svg",
          revision: "e1f0486a4daa7cc8ae282df1b0ab6b13",
        },
        {
          url: "/icons/server-03.svg",
          revision: "d4143131c6fbc42ca3fd8ac77081cf29",
        },
        {
          url: "/icons/server-04.svg",
          revision: "c44e3c41043b1a837abc8edc1890a38f",
        },
        {
          url: "/icons/server-05.svg",
          revision: "f3beb1e76172970afc77502babb052e5",
        },
        {
          url: "/icons/server-06.svg",
          revision: "a4748eb2d3eb082e1a93935089e8e22d",
        },
        {
          url: "/icons/settings-01.svg",
          revision: "5c5af15fa10a4b36fcb28e8c74effd92",
        },
        {
          url: "/icons/settings-02.svg",
          revision: "b11c86e0314400a3e1d16e94882ec1f7",
        },
        {
          url: "/icons/settings-03.svg",
          revision: "d634b30117c9b272b99c291a73c106cc",
        },
        {
          url: "/icons/settings-04.svg",
          revision: "d75b6357201e659cf95fa11617ceb4ee",
        },
        {
          url: "/icons/settings-ic.svg",
          revision: "fa8b757401d6a20e8da6af7cafcb04a5",
        },
        {
          url: "/icons/share-01.svg",
          revision: "1f813929ee173983807694c9ddd0a512",
        },
        {
          url: "/icons/share-02.svg",
          revision: "8903557a18188521213ae2809d608f25",
        },
        {
          url: "/icons/share-03.svg",
          revision: "44596dd1ea4622030abcb897f43a96f8",
        },
        {
          url: "/icons/share-04.svg",
          revision: "cf8e786a354ae2aa36713345bec6cfe6",
        },
        {
          url: "/icons/share-05.svg",
          revision: "6335a8c890a42b1ad612d88439502bac",
        },
        {
          url: "/icons/share-06.svg",
          revision: "5519ee2c999affea06c51fc20a449cdf",
        },
        {
          url: "/icons/share-07.svg",
          revision: "bbea716f3109b5135059f9af5b7e2b89",
        },
        {
          url: "/icons/shield-01.svg",
          revision: "b26cc5b41900904b3404d3a4ddc035fa",
        },
        {
          url: "/icons/shield-02.svg",
          revision: "344e6d2e6d87bf4af3678b90c62554fb",
        },
        {
          url: "/icons/shield-03.svg",
          revision: "9abc1f864fdf0265e3d7b441ff05c9c1",
        },
        {
          url: "/icons/shield-dollar.svg",
          revision: "c3b37d805eee9c9eb714b6a4728ffc7d",
        },
        {
          url: "/icons/shield-off.svg",
          revision: "beb262871942045dfdf3c0ffee053165",
        },
        {
          url: "/icons/shield-plus.svg",
          revision: "16bf82c7f3abf093792c79f88522ddcf",
        },
        {
          url: "/icons/shield-tick.svg",
          revision: "a4777619a29a0baad8fbda8776a8355d",
        },
        {
          url: "/icons/shield-zap.svg",
          revision: "3917c8d2ea1f9e7bb041baeb6866e5e1",
        },
        {
          url: "/icons/shopping-bag-01.svg",
          revision: "2ab832f9ff9761976e81f638f2d6fdf3",
        },
        {
          url: "/icons/shopping-bag-02.svg",
          revision: "67d12e909df5c83f38a8dee64fc5c019",
        },
        {
          url: "/icons/shopping-bag-03.svg",
          revision: "923bc644d8bd97ddf49eb787ebe6f3fe",
        },
        {
          url: "/icons/shopping-cart-01.svg",
          revision: "3b856959a8d05753f8e4ed56de187c96",
        },
        {
          url: "/icons/shopping-cart-02.svg",
          revision: "16db274f3fe59b1bd30b1b8325764f86",
        },
        {
          url: "/icons/shopping-cart-03.svg",
          revision: "4e89d1b72110a4e1a0fbda2c29a46636",
        },
        {
          url: "/icons/shuffle-01.svg",
          revision: "4357f103040e2a4928f38b79fedd88f5",
        },
        {
          url: "/icons/shuffle-02.svg",
          revision: "7ea31d9aafbdb9ffe11b568c306ac743",
        },
        {
          url: "/icons/signal-01.svg",
          revision: "5f2d826f0925d2a3ac82190c64ed1fa7",
        },
        {
          url: "/icons/signal-02.svg",
          revision: "78cbb7fc2e76e5e334ee54241066689a",
        },
        {
          url: "/icons/signal-03.svg",
          revision: "f281fe9d5c379fd0340dceaa9694ba3a",
        },
        {
          url: "/icons/simcard.svg",
          revision: "11fffff35912d45fd4657fb53c38a686",
        },
        {
          url: "/icons/skew.svg",
          revision: "c82dbdb15dc5b4fb24d37fba2cd476c5",
        },
        {
          url: "/icons/skip-back.svg",
          revision: "a452e8d1ac9717788f36df7d2a8f508f",
        },
        {
          url: "/icons/skip-forward.svg",
          revision: "b95cd9c8b9dcec04bb341386b80bc1e0",
        },
        {
          url: "/icons/slash-circle-01.svg",
          revision: "a7a23ea7df634410dda9f2b8342801a2",
        },
        {
          url: "/icons/slash-circle-02.svg",
          revision: "04f585168e243b70cd9dfc3046e72538",
        },
        {
          url: "/icons/slash-divider.svg",
          revision: "5a444b114557f1de50fcd0d30d4d165c",
        },
        {
          url: "/icons/slash-octagon.svg",
          revision: "403b2561830ab518a39380c8739b7b7d",
        },
        {
          url: "/icons/sliders-01.svg",
          revision: "a855efabed9757d7fd4cb6b5e44f898c",
        },
        {
          url: "/icons/sliders-02.svg",
          revision: "a3341395b299b4b9687dab8dc3efcf62",
        },
        {
          url: "/icons/sliders-03.svg",
          revision: "d634b30117c9b272b99c291a73c106cc",
        },
        {
          url: "/icons/sliders-04.svg",
          revision: "d75b6357201e659cf95fa11617ceb4ee",
        },
        {
          url: "/icons/snowflake-01.svg",
          revision: "00d8bef873ec466fd0d185014d9cc833",
        },
        {
          url: "/icons/snowflake-02.svg",
          revision: "1448dc01c4471f4ce63c025a478a2b81",
        },
        {
          url: "/icons/spacing-height-01.svg",
          revision: "2f2d91297e7d102e80a8c67878b0e5c9",
        },
        {
          url: "/icons/spacing-height-02.svg",
          revision: "944e8f93ec92682ee0d6674bf5e62366",
        },
        {
          url: "/icons/spacing-width-01.svg",
          revision: "24af86f7b81f8ffb10ce78af0cc931a1",
        },
        {
          url: "/icons/spacing-width-02.svg",
          revision: "a5afdb9574bac8eefd594dda12fcefc8",
        },
        {
          url: "/icons/speaker-01.svg",
          revision: "76ea77380ff354f0a57af3b22f80e098",
        },
        {
          url: "/icons/speaker-02.svg",
          revision: "ab2e2d8b6412788232ee829843de0ffd",
        },
        {
          url: "/icons/speaker-03.svg",
          revision: "f0b687460f56a50713b58df61c9f1c2e",
        },
        {
          url: "/icons/speedometer-01.svg",
          revision: "caf28022fb58cb2363ae1e08c1ddf92e",
        },
        {
          url: "/icons/speedometer-02.svg",
          revision: "316f4c86918d121b47d7c97dbd5c1d49",
        },
        {
          url: "/icons/speedometer-03.svg",
          revision: "55a27bff509ce52aabd830638ce1ba6c",
        },
        {
          url: "/icons/speedometer-04.svg",
          revision: "56629c1cc2996da6d76163eba7b9b81a",
        },
        {
          url: "/icons/square.svg",
          revision: "96bd665cf03b5afef851c8376ab2aff8",
        },
        {
          url: "/icons/stand.svg",
          revision: "0b07fbc2a2ca6b672357dceb755950cd",
        },
        {
          url: "/icons/star-01.svg",
          revision: "333174330ebaba7fa1fb4321a038d5bc",
        },
        {
          url: "/icons/star-02.svg",
          revision: "c1d1b8e4814baae2e4595b0fcb69e66a",
        },
        {
          url: "/icons/star-03.svg",
          revision: "ba9be1627ebbb1e7ff8903dd6d700bee",
        },
        {
          url: "/icons/star-04.svg",
          revision: "a688319ab716404c8e629a81e97a4325",
        },
        {
          url: "/icons/star-05.svg",
          revision: "95c323b4165a4f20a8b97b46fe12ad17",
        },
        {
          url: "/icons/star-06.svg",
          revision: "40abb0f47d2a866837d7063c70d4ba6c",
        },
        {
          url: "/icons/star-07.svg",
          revision: "445d429c0ae9bca41f753dfc76e567bb",
        },
        {
          url: "/icons/stars-01.svg",
          revision: "c0215046224cd03db97d3e57af733360",
        },
        {
          url: "/icons/stars-02.svg",
          revision: "c1ab4be5c21f55877a60e5047c1b9560",
        },
        {
          url: "/icons/stars-03.svg",
          revision: "a6dff3721e9013b39d1df027204ca90f",
        },
        {
          url: "/icons/sticker-circle.svg",
          revision: "3bea91a80f8e9b284d5bfc16c4fc2c9a",
        },
        {
          url: "/icons/sticker-square.svg",
          revision: "f3d220fe4ca85dc6f2e19259d89debfe",
        },
        {
          url: "/icons/stop-circle.svg",
          revision: "dcfd275882501bec09ffebb9c42d4a9e",
        },
        {
          url: "/icons/stop-square.svg",
          revision: "eba5d478d0da1c2aae469113136c3032",
        },
        {
          url: "/icons/stop.svg",
          revision: "96bd665cf03b5afef851c8376ab2aff8",
        },
        {
          url: "/icons/strikethrough-01.svg",
          revision: "7ca7a5e9fafdbba6265b8b1f9f29d05a",
        },
        {
          url: "/icons/strikethrough-02.svg",
          revision: "cbe8bbb95f276e9fa202693b0dfee535",
        },
        {
          url: "/icons/strikethrough-square.svg",
          revision: "f34eb4e9fb583aa79f3614936e1e8d51",
        },
        {
          url: "/icons/subscript.svg",
          revision: "4431a1f3e67a0bfba1d41d5c8467dd03",
        },
        {
          url: "/icons/sun-setting-01.svg",
          revision: "ec4b2d18d037516f39ac700282d74f5f",
        },
        {
          url: "/icons/sun-setting-02.svg",
          revision: "5ac469d134c3d093f06d4cae959a392c",
        },
        {
          url: "/icons/sun-setting-03.svg",
          revision: "4fba03e12884dbc3e0a355dc3ce70644",
        },
        { url: "/icons/sun.svg", revision: "69bcf0cee157be246389a7bf28a5dd75" },
        {
          url: "/icons/sunrise.svg",
          revision: "e7779663588685dfa2d5e6f3f6bd6e6b",
        },
        {
          url: "/icons/sunset.svg",
          revision: "8247480095563aa0a4d752c729bb1f0a",
        },
        {
          url: "/icons/switch-horizontal-01.svg",
          revision: "178ab577cd8ae17204c86c35f115191b",
        },
        {
          url: "/icons/switch-horizontal-02.svg",
          revision: "52ff001734dc02614d904c8f34a0d764",
        },
        {
          url: "/icons/switch-vertical-01.svg",
          revision: "b9bafe96560dff04df525a7af9501a6a",
        },
        {
          url: "/icons/switch-vertical-02.svg",
          revision: "464304f5293e72b9b6cf6aeb546d15e9",
        },
        {
          url: "/icons/table.svg",
          revision: "9a0ff19b532ba2d7c0be6345e4d37bad",
        },
        {
          url: "/icons/tablet-01.svg",
          revision: "def48ac3a92e0277aa070d12539445bf",
        },
        {
          url: "/icons/tablet-02.svg",
          revision: "d7ae634a55eb5c666dae308332bbdf5c",
        },
        {
          url: "/icons/tag-01.svg",
          revision: "f9505880ff33b0f39ddf6e50489ff05e",
        },
        {
          url: "/icons/tag-02.svg",
          revision: "421624bfa305138fa66b42e360e5b9c5",
        },
        {
          url: "/icons/tag-03.svg",
          revision: "d17981d07934d5ca816fb650bc0b2ad8",
        },
        {
          url: "/icons/target-01.svg",
          revision: "0946d49b7887d194aa327a0fb1169e7b",
        },
        {
          url: "/icons/target-02.svg",
          revision: "e78e7e2fd0be7b38766c90dcaff4ebea",
        },
        {
          url: "/icons/target-03.svg",
          revision: "64ff617ba7424480df9d1f9bbaf64166",
        },
        {
          url: "/icons/target-04.svg",
          revision: "d8b26bb42cca854213a611992303bb5c",
        },
        {
          url: "/icons/target-05.svg",
          revision: "2ce69d2a6737b5712a22c647a3f47373",
        },
        {
          url: "/icons/telescope.svg",
          revision: "59805e907f64aba07ed578b7109c9529",
        },
        {
          url: "/icons/terminal-browser.svg",
          revision: "072c0aba4d328a33d859a3fd26f2fa3e",
        },
        {
          url: "/icons/terminal-circle.svg",
          revision: "df704b5b25251cbaa73ad0d89141b771",
        },
        {
          url: "/icons/terminal-square.svg",
          revision: "6990eddcd60155f8f0ee087936790433",
        },
        {
          url: "/icons/terminal.svg",
          revision: "b4e1a670ab9d11d00bd59356c8aff292",
        },
        {
          url: "/icons/text-input.svg",
          revision: "355e26f42e88ec41410ba51570d9e213",
        },
        {
          url: "/icons/thermometer-01.svg",
          revision: "5286f0427213a8e4c18fd721cd9954db",
        },
        {
          url: "/icons/thermometer-02.svg",
          revision: "5be6fc94f0eaa6ab4d3c2c77fc05ceb4",
        },
        {
          url: "/icons/thermometer-03.svg",
          revision: "21ee1a7941dbdafd5724a56f3060db5a",
        },
        {
          url: "/icons/thermometer-cold.svg",
          revision: "aafc76cf1c6fbe2ac242a5ffeaf6ff00",
        },
        {
          url: "/icons/thermometer-warm.svg",
          revision: "0f630aa06e3a99aa7a03282a3e5344b4",
        },
        {
          url: "/icons/thumbs-down.svg",
          revision: "99506831aa554a8a2e97d1b1e99c635f",
        },
        {
          url: "/icons/thumbs-up.svg",
          revision: "8f665c029a837453a7ef3aa217bbc7e8",
        },
        {
          url: "/icons/ticket-01.svg",
          revision: "15ba5656c52fc363d2767179fc387b14",
        },
        {
          url: "/icons/ticket-02.svg",
          revision: "f749a43bce9710cf9c3763b32048593e",
        },
        {
          url: "/icons/toggle-01-left.svg",
          revision: "93e7580f750d96b787228698e502be27",
        },
        {
          url: "/icons/toggle-01-right.svg",
          revision: "10d846c544c8307aa1bd6cfd929e73a3",
        },
        {
          url: "/icons/toggle-02-left.svg",
          revision: "e783011be1a034f6db676581242bd430",
        },
        {
          url: "/icons/toggle-02-right.svg",
          revision: "3a517cd51b9ac768aefbf95383781317",
        },
        {
          url: "/icons/toggle-03-left.svg",
          revision: "aa9b3f02e4449323819d69812f542116",
        },
        {
          url: "/icons/toggle-03-right.svg",
          revision: "5e121ca8e2f4d1584aef9a7c5c49d8e5",
        },
        {
          url: "/icons/tool-01.svg",
          revision: "23f2e28ae9f0fbcc7d93db03ae1e9575",
        },
        {
          url: "/icons/tool-02.svg",
          revision: "1eecb9ae06fe525773eebf4dd622c01b",
        },
        {
          url: "/icons/train.svg",
          revision: "9a50cb36383cfc65257b5033063e5df8",
        },
        {
          url: "/icons/tram.svg",
          revision: "cac2c179b83d9cc127808e4d377cd8cf",
        },
        {
          url: "/icons/transform.svg",
          revision: "48a3d15f80969368f266edf079fac10c",
        },
        {
          url: "/icons/translate-01.svg",
          revision: "342bb1dca7cec09e7d91b14c3eb802aa",
        },
        {
          url: "/icons/translate-02.svg",
          revision: "0087509351eb751f57a31b2192827c4b",
        },
        {
          url: "/icons/trash-01.svg",
          revision: "63b43e2c0e96e9729c2c64947ce766d2",
        },
        {
          url: "/icons/trash-02.svg",
          revision: "b426638783743e289884c3ed4b51087f",
        },
        {
          url: "/icons/trash-03.svg",
          revision: "82b21c772330dd75146a12a693635b23",
        },
        {
          url: "/icons/trash-04.svg",
          revision: "c03bc27df44699019d069824e30ba955",
        },
        {
          url: "/icons/trend-down-01.svg",
          revision: "e03eab043b5949045fd717d58542d922",
        },
        {
          url: "/icons/trend-down-02.svg",
          revision: "dd96479281dbf0a0f7546f02f05307fe",
        },
        {
          url: "/icons/trend-up-01.svg",
          revision: "00bbde8475d845bc783a38cea57d9da2",
        },
        {
          url: "/icons/trend-up-02.svg",
          revision: "067fc19715e0caf7fa1916e9ac74c590",
        },
        {
          url: "/icons/triangle.svg",
          revision: "cedb1afeefb16434dfb8903d69a86396",
        },
        {
          url: "/icons/trophy-01.svg",
          revision: "4e517581a49672fe5c9b31a4502709ee",
        },
        {
          url: "/icons/trophy-02.svg",
          revision: "816d1b3f4225ffde3c66f00b76a0ee96",
        },
        {
          url: "/icons/truck-01.svg",
          revision: "3ed09eaaeb04b699e7c2af6eb42ee16b",
        },
        {
          url: "/icons/truck-02.svg",
          revision: "ec6fc3a43b0db5ef6cf6cf0962f5b563",
        },
        {
          url: "/icons/tv-01.svg",
          revision: "b7ea6b46bcffd2e08f3dc2b9aab48622",
        },
        {
          url: "/icons/tv-02.svg",
          revision: "9eb1676abd09c190033ae4192bfdff77",
        },
        {
          url: "/icons/tv-03.svg",
          revision: "658e3881e8536d2d1e46eda71db0c1a5",
        },
        {
          url: "/icons/type-01.svg",
          revision: "62dbd79a30daac602e04b94102f53b23",
        },
        {
          url: "/icons/type-02.svg",
          revision: "56e9b8e281c7b8fe5fe87c17b7a04dfd",
        },
        {
          url: "/icons/type-square.svg",
          revision: "81fede294766eac1a9fac542d9225c5d",
        },
        {
          url: "/icons/type-strikethrough-01.svg",
          revision: "8b1a5c25bbdae0f680d2524bec447c27",
        },
        {
          url: "/icons/type-strikethrough-02.svg",
          revision: "e3db077ee55b09e947c472a046af95ed",
        },
        {
          url: "/icons/umbrella-01.svg",
          revision: "9ea7220724e784bcf4741faa8749d65e",
        },
        {
          url: "/icons/umbrella-02.svg",
          revision: "a18f4425e063889dac2f2bb2a1340cbd",
        },
        {
          url: "/icons/umbrella-03.svg",
          revision: "9114d016c631f9582253f5e5127e7b71",
        },
        {
          url: "/icons/underline-01.svg",
          revision: "5abaa8209a6aec4421b2fd45e72f368f",
        },
        {
          url: "/icons/underline-02.svg",
          revision: "eecbda49eec0334bc1b6793999aa6f86",
        },
        {
          url: "/icons/underline-square.svg",
          revision: "aa90fe496da2c92daf4becc4d0073724",
        },
        {
          url: "/icons/upload-01.svg",
          revision: "4af918558d0d9feee2c180628085c9bc",
        },
        {
          url: "/icons/upload-02.svg",
          revision: "7a4b0c82364a188d03d5b60ed8300275",
        },
        {
          url: "/icons/upload-03.svg",
          revision: "89842d2062f39c8309cbc08c8d38040a",
        },
        {
          url: "/icons/upload-04.svg",
          revision: "81c95862076a758d7235777c8d2ee267",
        },
        {
          url: "/icons/upload-cloud-01.svg",
          revision: "d35ff30e5a538a0137815379ace91137",
        },
        {
          url: "/icons/upload-cloud-02.svg",
          revision: "f5ab1a8bfd4e801f3ae24a16421f7b9a",
        },
        {
          url: "/icons/usb-flash-drive.svg",
          revision: "df9ea28c1ad34fb0a88a82be2c0b36a9",
        },
        {
          url: "/icons/user-01.svg",
          revision: "f411244dc8a07edf60d980ec096cfe1c",
        },
        {
          url: "/icons/user-02.svg",
          revision: "bc3b4e5c9274cbf4b773462b04826c7b",
        },
        {
          url: "/icons/user-03.svg",
          revision: "f140c6bb045c4d16360935da8a8781f1",
        },
        {
          url: "/icons/user-check-01.svg",
          revision: "57353099caa68e0777b84dd9879ed803",
        },
        {
          url: "/icons/user-check-02.svg",
          revision: "f8ff575e6052ed8d890184ee8f34b799",
        },
        {
          url: "/icons/user-circle.svg",
          revision: "13b9b72a1f8694623a05e02d5ba514af",
        },
        {
          url: "/icons/user-down-01.svg",
          revision: "6c12b2f68d8e1c8f37ea0897eda85a75",
        },
        {
          url: "/icons/user-down-02.svg",
          revision: "22a49a542178a036b11e82c6624a36d3",
        },
        {
          url: "/icons/user-edit.svg",
          revision: "1d53095a6648bf9cb2ce9e3eefdae7da",
        },
        {
          url: "/icons/user-left-01.svg",
          revision: "6434beb56f344495aa82286c8ebd10d6",
        },
        {
          url: "/icons/user-left-02.svg",
          revision: "68393485cd919e2dbdc4197285739204",
        },
        {
          url: "/icons/user-minus-01.svg",
          revision: "88da0a86fb28849dbcd1b9dcf75b37b6",
        },
        {
          url: "/icons/user-minus-02.svg",
          revision: "0d8068277074db99c1b02b6b24d38e6c",
        },
        {
          url: "/icons/user-plus-01.svg",
          revision: "02971afe9a8ad702121d5c16332ab553",
        },
        {
          url: "/icons/user-plus-02.svg",
          revision: "4b862b074a338c10fdfbd0970ac67a02",
        },
        {
          url: "/icons/user-right-01.svg",
          revision: "6db7da66617c0c1ae2e0f4db9c8dd20a",
        },
        {
          url: "/icons/user-right-02.svg",
          revision: "c61881a2d98e57e24ed47b6212d9a1dc",
        },
        {
          url: "/icons/user-square.svg",
          revision: "3c2b71e91c80d7872b0ea9c022a5d50d",
        },
        {
          url: "/icons/user-up-02.svg",
          revision: "117b6aa4ae25e0704d87fe9ca08e6184",
        },
        {
          url: "/icons/user-x-01.svg",
          revision: "1d706fabcd44f73dcd21825496a240ec",
        },
        {
          url: "/icons/user-x-02.svg",
          revision: "d1e7657c850ea4f433cf9d3239e2c7d3",
        },
        {
          url: "/icons/users-01.svg",
          revision: "e9d16cb0530b8430332e1bda21c50104",
        },
        {
          url: "/icons/users-02.svg",
          revision: "a8796f59eb2cb9897e1ca2d653192342",
        },
        {
          url: "/icons/users-03.svg",
          revision: "54809caef17d173cd292487ee9ea5dcf",
        },
        {
          url: "/icons/users-check.svg",
          revision: "e7dec633ed1faa9b5419f3944b6e620a",
        },
        {
          url: "/icons/users-down.svg",
          revision: "4d49d7a795319a72eb22b00113d6808c",
        },
        {
          url: "/icons/users-edit.svg",
          revision: "54f59083a975342be847a77e6d4f57a6",
        },
        {
          url: "/icons/users-left.svg",
          revision: "90b97dbe19a5e7c8ed59bce80edb59b5",
        },
        {
          url: "/icons/users-minus.svg",
          revision: "aa974b599f9e681526de18fbd36fc11b",
        },
        {
          url: "/icons/users-plus.svg",
          revision: "4ad635538b621a350fd62753d1dbffe0",
        },
        {
          url: "/icons/users-right.svg",
          revision: "5ab424e4d9e04277d60980fd5e2403b1",
        },
        {
          url: "/icons/users-up.svg",
          revision: "b9c05d67f9033e0641eb300fd64cd195",
        },
        {
          url: "/icons/users-x.svg",
          revision: "18ec49721dc0046c15ef825a62d6f064",
        },
        {
          url: "/icons/variable.svg",
          revision: "f9266ae72eca38cae3eb9522c2448293",
        },
        {
          url: "/icons/video-recorder-off.svg",
          revision: "1aeb2b9eb1f195dd0edbce2a7d6ad2f3",
        },
        {
          url: "/icons/video-recorder.svg",
          revision: "48b6b81355b427038cfbf86b5a510a3a",
        },
        {
          url: "/icons/virus.svg",
          revision: "7dd1ec1f73c7b162045e3ee44de94746",
        },
        {
          url: "/icons/voicemail.svg",
          revision: "ca75283826d2bf7ee448b8f34f5d5897",
        },
        {
          url: "/icons/volume-max.svg",
          revision: "094e55b60a75aa9e938df1175c9db7aa",
        },
        {
          url: "/icons/volume-min.svg",
          revision: "64f2d797c00452620ca2e9aa30ed07ca",
        },
        {
          url: "/icons/volume-minus.svg",
          revision: "5145f073e92749f1a0e06dbfc2a83689",
        },
        {
          url: "/icons/volume-plus.svg",
          revision: "481dff2b12cf881aa2ee93a2db9095e8",
        },
        {
          url: "/icons/volume-x.svg",
          revision: "e48fe6b41546b126c2ee645f99be9514",
        },
        {
          url: "/icons/wallet-01.svg",
          revision: "1198f7f0551236341b1923e0b22b517d",
        },
        {
          url: "/icons/wallet-02.svg",
          revision: "98f55f27806bf3e6de72c15d0d937459",
        },
        {
          url: "/icons/wallet-03.svg",
          revision: "889aa2f3d96608893c5a5203ed720243",
        },
        {
          url: "/icons/wallet-04.svg",
          revision: "c2a9ad0598fc0ffe3a25fca13a45c4c1",
        },
        {
          url: "/icons/wallet-05.svg",
          revision: "8da97a2ef9863e42ce353b57a45369f0",
        },
        {
          url: "/icons/watch-circle.svg",
          revision: "732a5fa488ae64da5046dcbb3b12a42e",
        },
        {
          url: "/icons/watch-square.svg",
          revision: "445b1250f384aac97ac4ff91735aa379",
        },
        {
          url: "/icons/waves.svg",
          revision: "9b2eb1a669130243369c3bfa144e07bb",
        },
        {
          url: "/icons/webcam-01.svg",
          revision: "08d17dd0d26ce47681258c54fede8138",
        },
        {
          url: "/icons/webcam-02.svg",
          revision: "56b26b7dca2562401bdf4924b904d8d1",
        },
        {
          url: "/icons/wifi-off.svg",
          revision: "e663130608958beb466cba80ba225481",
        },
        {
          url: "/icons/wifi.svg",
          revision: "edd5be80395076c41353af547d0de435",
        },
        {
          url: "/icons/wind-01.svg",
          revision: "8031dbb2510e87d75d9eb4239b241e29",
        },
        {
          url: "/icons/wind-02.svg",
          revision: "680d441d338c3ca4e39573bedd5603d6",
        },
        {
          url: "/icons/wind-03.svg",
          revision: "153c075a634a20471a9c2c899dd5d5c6",
        },
        {
          url: "/icons/x-circle.svg",
          revision: "d721bbc1ca159dc33ba12fa1b4d1f024",
        },
        {
          url: "/icons/x-close.svg",
          revision: "e5da95324d62e62b6e114209248977e1",
        },
        {
          url: "/icons/x-square.svg",
          revision: "3c172ae4beb85c50c1aa784776d7c2fa",
        },
        { url: "/icons/x.svg", revision: "0af07a10680867b7cef7cb639c597881" },
        {
          url: "/icons/youtube.svg",
          revision: "11200a12ecb6d065b0651c522465a835",
        },
        {
          url: "/icons/zap-circle.svg",
          revision: "a90bf63f4060bd89555647c27330e19f",
        },
        {
          url: "/icons/zap-fast.svg",
          revision: "70a40d5e86aaf56f8dd73fc34ca0b3c5",
        },
        {
          url: "/icons/zap-off.svg",
          revision: "c6fc58e88e3b3d1b6e03ad01145b2f05",
        },
        {
          url: "/icons/zap-square.svg",
          revision: "7180377785e66f67d96c931990330797",
        },
        { url: "/icons/zap.svg", revision: "e1ea657a777c26534df375955dc7a972" },
        {
          url: "/icons/zoom-in.svg",
          revision: "d1a0becf7a3ab9a5801c05a3307f1c55",
        },
        {
          url: "/icons/zoom-out.svg",
          revision: "30d24eee56e4f2812a49b882456c6187",
        },
        {
          url: "/images/bimbo-profile.png",
          revision: "ac4fdbb469057072fe30398e6ff1ded5",
        },
        {
          url: "/images/bimbo.png",
          revision: "9cb58633e3fc2a99c4696da4278c4f4b",
        },
        {
          url: "/images/note-preview.png",
          revision: "4675a4b0fb59c8fa9ad6e12c36523453",
        },
        {
          url: "/images/overlay.png",
          revision: "e5d8635422fbde2a7c6fc23344a96ad5",
        },
        {
          url: "/images/sun.png",
          revision: "dda4b2b26862ca8efb844e62ea92cc36",
        },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        {
          url: "/styles/globals.css",
          revision: "5a05ae2219c1645daecb53538f765310",
        },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
