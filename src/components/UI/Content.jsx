import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const Content = ({ activeProduct = { price: '$34.99' }, onNext, onPrev }) => {
  return (
    <div className="content-wrapper">
      {/* PAGE 0: SPAING HERO */}
      <section className="section section-hero">
        <div className="hero-top-left">
           <div className="promo-video">
              <div className="play-btn"><Play size={10} fill="white" /></div>
              <span>Promotion video</span>
           </div>
        </div>

        <div className="hero-bottom-container">
          <div className="hero-price-block">
            <span className="price-label">{activeProduct.price}</span>
            <span className="price-subtext">SIZE: 29.5" • OFFICIAL</span>
          </div>
          
          <div className="hero-cta-block">
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
          
          <div className="hero-nav-block">
             <div className="slider-arrows">
                <div className="arrow-btn prev" onClick={onPrev} style={{ cursor: 'pointer' }}><ChevronLeft size={16} /></div>
                <div className="arrow-btn next active" onClick={onNext} style={{ cursor: 'pointer' }}><ChevronRight size={16} /></div>
             </div>
          </div>
        </div>
      </section>

      {/* PAGE 1: ELITE CONTROL */}
      <section className="section section-split section-elite">
        <div className="layout-elite">
          <div className="elite-header">
            <p className="label-orange-dot"><span></span> PERFORMANCE METRICS</p>
            <h1 className="title-huge-condensed">ELITE<br/>CONTROL</h1>
          </div>
          
          <div className="elite-stats">
            <div className="elite-stat-block">
              <div className="elite-stat-header">
                <span className="elite-val">100%</span>
                <div className="elite-line-h"></div>
              </div>
              <p className="elite-label">MICROFIBER COMPOSITE</p>
              <p className="elite-desc">Exclusive coating material providing superior grip management in all weather conditions.</p>
            </div>
            
            <div className="elite-stat-block">
              <div className="elite-stat-header">
                <span className="elite-val">0.5mm</span>
                <div className="elite-line-h"></div>
              </div>
              <p className="elite-label">PEBBLE DEPTH</p>
              <p className="elite-desc">Optimized surface texture for precision handling and rotational feedback.</p>
            </div>
          </div>
          <div className="elite-line-v"></div>
        </div>
      </section>

      {/* PAGE 2: PERFECT FLIGHT */}
      <section className="section section-split section-aerodynamics">
        <div className="layout-aero">
          <div className="aero-header">
            <span className="pill-label">AERODYNAMICS</span>
            <h1 className="title-huge-condensed">PERFECT<br/>FLIGHT</h1>
          </div>
          
          <div className="aero-stats">
            <div className="aero-stat-item">
              <div className="aero-stat-main">
                <span className="aero-val">0.85</span>
                <span className="aero-dot"></span>
              </div>
              <p className="aero-label">DRAG COEFFICIENT</p>
            </div>
            
            <div className="aero-stat-item">
              <div className="aero-stat-main">
                <span className="aero-val">28.5</span>
                <span className="aero-dot"></span>
              </div>
              <p className="aero-label">ROTATIONAL STABILITY</p>
            </div>
          </div>
          
          <p className="aero-description">
            Symmetrically balanced weight distribution ensures true flight path and consistent rotation speed, critical for long-range precision.
          </p>
        </div>
      </section>

      {/* PAGE 3: HUD / MICRO-TEXTURE */}
      <section className="section section-hud">
        <div className="hud-container">
          <div className="hud-label top-left">
            <div className="hud-line-v"></div>
            <div className="hud-content">
              <p className="label-tiny">MICRO-TEXTURE</p>
              <div className="hud-value-row">
                <span className="hud-value-large">1.2mm</span>
                <div className="hud-line-h"></div>
              </div>
              <p className="label-tiny">PEBBLE HEIGHT</p>
            </div>
          </div>

          <div className="hud-label center-left">
             <p className="label-tiny">ELEVATION: 12.8°</p>
          </div>

          <div className="hud-label bottom-right">
            <div className="hud-content align-right">
              <p className="label-tiny">COATING SPEC</p>
              <div className="hud-value-row rev">
                <div className="hud-line-h"></div>
                <span className="hud-value-large">High-Tack</span>
              </div>
              <div className="hud-line-v"></div>
            </div>
          </div>

          <div className="hud-label center-right">
             <p className="label-tiny">AZIMUTH: 45.2°</p>
          </div>

          <div className="hud-label bottom-center">
             <p className="label-tiny letter-spacing-lg">CHANNEL DEPTH</p>
          </div>
        </div>
      </section>

      {/* PAGE 4: THE CHAMPION (PODIUM) */}
      <section className="section section-podium">
        <div className="layout-champion">
          <div className="podium-header">
            <p className="subtitle-podium">LIMITED EDITION</p>
            <h1 className="title-champion">THE CHAMPION</h1>
          </div>
          
          <div className="podium-stats">
            <div className="podium-stat-left">
              <p className="label-orange">RANK 01</p>
              <h4>Elite Tier</h4>
              <p className="stat-desc-small">Constructed for the highest level of competition.</p>
            </div>
            
            <div className="podium-stat-right">
              <p className="label-orange">CERTIFIED</p>
              <h4>Gold Standard</h4>
              <p className="stat-desc-small">Meets all regulation weight and size requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 5: DEFY GRAVITY */}
      <section className="section section-cta">
        <div className="layout-cta">
          <p className="label-orange-bg">NEXT LEVEL PERFORMANCE</p>
          <h1 className="title-huge">DEFY<br/>GRAVITY</h1>
          <button className="shop-button">SHOP COLLECTION</button>
          
          <div className="footer-links">
            <div className="footer-item">• OFFICIAL STORE</div>
            <div className="footer-item">• GLOBAL SHIPPING</div>
            <div className="social-icons">
               <span>𝕏</span> <span>🌐</span> <span>▶</span>
            </div>
            <div className="footer-item">SECURE CHECKOUT</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
