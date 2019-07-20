![demo](https://github.com/tcarlsen/lovelace-light-with-profiles/raw/master/demo.gif)

## Usage

After installation you will need to add the resource in `lovelace.yaml`:

```yaml
resources:
  - type: module
    url: /local/community/lovelace-light-with-profiles/light-with-profiles.js
```

If you then like the card to be able to show wich profiles are active *(change color)* you will need to add your profiles defined in `light_profiles.csv` in your `lovelace.yaml`:

```yaml
light_profiles:
  bright: '0.457,0.408,254'
  dimmed: '0.457,0.408,77'
  nightlight: '0.509,0.411,1'
```

Now you're ready to add the custom card:

```yaml
type: 'custom:light-with-profiles'
title: Lys
entities:
  - entity: light.spisestuen
    profiles:
      - name: bright
        icon: 'mdi:brightness-5'
      - name: dimmed
        icon: 'mdi:brightness-4'
      - name: nightlight
        icon: 'mdi:brightness-3'
  ...
  - entity: light.entreen
  - entity: light.kokken
```

---
<a href="https://www.buymeacoffee.com/tcarlsen" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
